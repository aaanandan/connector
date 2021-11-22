const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { createAdapter } = require("@socket.io/cluster-adapter");
const { setupWorker } = require("@socket.io/sticky");
const redisSocketioAdapter = require('socket.io-redis');
const process = require('process');

const redisPort = config.redisPort || 6379;
const redisHost = config.redisHost || config.DefaultHost;
const stream = require('./stream');
const getChanelName = require('./pubSub');
const gameEvents = require('./gameEvents');
const redis = require("redis");
const jwt = require('jsonwebtoken');
const ALL_PLAYERS = 'all_players';
const gameBoard = require('./gameBoard');
// const { stream } = require('./config/logger');
// const httpServer = require('http').createServer(app);

let server;

//TODO: make a schema
let queueData = {
  event: null,
  socketid: null,
  clientip: null,
  userid: null,
  data: null
};

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
});

server = app.listen(config.port, () => {
  logger.info(`FTE Game Socket server instance ${process.pid} on port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error('Error :', JSON.stringify(error));
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

const io = require('socket.io')(server);
//add cluster adapter to be managed by pm2
io.adapter(createAdapter());
setupWorker(io);

//add Redis adapter
io.adapter(redisSocketioAdapter({ host: redisHost, port: redisPort }));

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, config.jwt.secret, function (err, decoded) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      socket.handshake.query.userid = "userid_" + Date.now();
      logger.info()
      next();
    });
  }
  else {
    logger.error(`Authentication error`);
    next(new Error('Authentication error'));
  }
}).on(gameEvents.CONNECTION, (socket) => {

  logger.info(`connection ${socket.id}`);

  //send to stream Q
  queueData.event = gameEvents.CONNECTION;
  queueData.socketid = socket.id;
  queueData.userid = socket.handshake.query.userid;
  queueData.clientip = socket.handshake.address;
  queueData.data = socket.handshake;
  stream.pushToQueue(queueData);

  const channelName = getChanelName(socket);
  //subscribe to resposne on pub-sub
  const subscriber = redis.createClient();
  const publisher = redis.createClient();

  subscriber.subscribe(channelName);
  subscriber.subscribe(ALL_PLAYERS);


  //used for load Testing
  socket.on(gameEvents.TOURNAMENT_STATUS, function () {
    logger.info(`replying tournament status to : ${queueData.userid}`);
    console.log(`replying tournament status to : ${queueData.userid}`);

    gameBoard.getTounamentStatus().then((data) => {
      console.log(`gameBoard.getTounamentStatus() :`, data);
      socket.emit(gameEvents.TOURNAMENT_STATUS, data);
      // if (data.userid) {
      //   socket.emit(events.REGISTRATION_OPEN, { id: status.id, name: status.name });
      // }
    });
  });

  socket.on(gameEvents.REGISTERATION, function (data) {
    queueData.event = gameEvents.REGISTERATION;
    // queueData.socketid=socket.id;
    // queueData.clientip=socket.handshake.address;
    // queueData.userid='data.userid';
    queueData.data = data;
    stream.pushToQueue(queueData);
    logger.info(`${queueData.userid} - registration queued`);
  });

  subscriber.on("message", function (channel, message) {
    if (channel == ALL_PLAYERS) {
      socket.emit(message);// emit common message to all Players
      logger.info(`${queueData.userid}'s ${message} update sent`);
      // if (message === gameEvents.CANCELED_TOURNAMENT) {
      //   queueData.event = gameEvents.CANCELED_TOURNAMENT;
      //   logger.info('Qeueing canceled', JSON.stringify(queueData));
      //   stream.pushToQueue(queueData);
      // }
    } else {
      // a update from processor about indiduvial users
      // if (message === gameEvents.REGISTRATION) {
      //get the status from redis JSON and send to player.
      // gameBoard.getRegistrationStatus().then((status) => {
      //   socket.emit(events.REGISTRATION, status);
      // });
      // }
    }
  });
});