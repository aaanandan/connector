const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { createAdapter } = require("@socket.io/cluster-adapter");
const { setupWorker } = require("@socket.io/sticky");
const redis = require('socket.io-redis');
const process = require('process');

const redisPort = config.redisPort || 6379;
const redisHost = config.redisHost || config.DefaultHost;
const pushToQueue = require('./stream');
const events = require('./connectorEvents');
const redisNode = require("redis");

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
  logger.error(error);
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
io.adapter(redis({ host: redisHost, port: redisPort }));

io.on(events.CONNECTION, (socket) => {

  logger.info(`connection ${socket.id}`);
  //send to stream Q
  queueData.event=events.CONNECTION;
  queueData.socketid=socket.id;
  queueData.clientip=socket.handshake.address;
  queueData.data=socket.handshake;
  pushToQueue(queueData);

  //subscribe to resposne on pub-sub
  const subscriber = redisNode.createClient();
  const publisher = redisNode.createClient();

  subscriber.subscribe(events.CONNECTION);
  subscriber.on("subscribe", function(channel, count) {
  logger.info(`Subscribed to ${channel} count :${count}`);  

  //temp code, publish will happen from scheduler.
  publisher.publish(channel, "SUCCESS");

});

  
  //used for load Testing
  socket.on(events.REGISTER, function (data) {
    queueData.event=events.REGISTER;
    // queueData.socketid=socket.id;
    // queueData.clientip=socket.handshake.address;
    queueData.userid='data.userid';
    queueData.data=data;
    pushToQueue(queueData);
  
    subscriber.subscribe(events.REGISTER);
    subscriber.on("subscribe", function(channel, count) {
    logger.info(`Subscribed to ${channel} count :${count}`);  

    //temp code, publish will happen from scheduler.
    publisher.publish(channel, "SUCCESS");
    });

   
    logger.info('registration Queued, Subscribed to response');
  });




  subscriber.on("message", function(channel, message) {
    socket.emit(channel);
    logger.info(`Response recevied for socketID ${socket.id} ${channel} message :${message}`);

  });

  
});