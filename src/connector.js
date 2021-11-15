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
const pushToQueue = require('./stream');
const getChanelName = require('./pubSub');
const events = require('./gameEvents');
const redis = require("redis");
const jwt = require('jsonwebtoken');
const ALL_PLAYERS ='all_players';
const gameBoard = require('./gameBoard');
// const { stream } = require('./config/logger');
// const httpServer = require('http').createServer(app);

let server;

//TODO: make a schema
let queueData ={
  event:null,
  socketid: null, 
  clientip:null, 
  userid:null, 
  data:null
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


io.use(function(socket, next){
  if (socket.handshake.query && socket.handshake.query.token){
    jwt.verify(socket.handshake.query.token, config.jwt.secret, function(err, decoded) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      socket.handshake.query.userid="userid_"+Date.now();
      logger.info()
      next();
    });
  }
  else {    
    logger.error(`Authentication error`);
    next(new Error('Authentication error'));
  }    
}).on(events.CONNECTION, (socket) => {

  logger.info(`connection ${socket.id}`);

  //send to stream Q
  queueData.event=events.CONNECTION;
  queueData.socketid=socket.id;
  queueData.userid=socket.handshake.query.userid;
  queueData.clientip=socket.handshake.address;
  queueData.data=socket.handshake;
  pushToQueue(queueData);

  const channelName = getChanelName(socket);
  //subscribe to resposne on pub-sub
  const subscriber = redis.createClient();
  const publisher = redis.createClient();

  subscriber.subscribe(channelName);
  subscriber.subscribe(ALL_PLAYERS);
  

  //used for load Testing
  socket.on(events.TOURNAMENT_STATUS, function (data) {
    logger.info(`replying tournament status to : ${queueData.userid}`);
      gameBoard.getTounamentStatus().then((status)=>{
        socket.emit(events.TOURNAMENT_STATUS, status);    
        if(status.userid){
          socket.emit(events.REGISTRATION_OPEN, status);    
        }
        
      });
    });
    
  socket.on(events.REGISTERATION, function (data) {
    queueData.event=events.REGISTERATION;
    // queueData.socketid=socket.id;
    // queueData.clientip=socket.handshake.address;
    // queueData.userid='data.userid';
    queueData.data=data;
    pushToQueue(queueData);
    logger.info(`${queueData.userid} - registration queued`);    
    });
    
    subscriber.on("message", function(channel, message) {
      // if(channel===ALL_PLAYERS) {
      //   socket.emit(message);// emit common message to all Players
      // }else{
      //   // a update from processor about registration
      //   if(message===events.REGISTRATION){
      //     //get the status from redis JSON and send to player.
      //     gameBoard.getRegistrationStatus().then((status)=>{
      //       socket.emit(events.REGISTRATION,status);
      //     });           
      //   }        
      // }
      socket.emit(message);
      logger.info(`${queueData.userid}'s ${message} update sent`);

    });
});