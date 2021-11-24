const { io } = require("socket.io-client");

const jwt = require('jsonwebtoken');
const logger = require("../../src/config/logger");
const JWT_SECRET = 'thisisasamplesecret';


const URL = "http://localhost:3000";
const MAX_CLIENTS = 1;
const CLIENT_CREATION_INTERVAL_IN_MS = 100;
const EMIT_INTERVAL_IN_MS = 2000;
const PLAYLOAD = 'playload';
const REGISTRATION = 'registration';

const registrationData = {
  registrationBy: 'COOKIES',
  count: '50000',
};

let clientCount = 0;
let requestSinceLastReport = 0, requestCount = 0, responseCount = 0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

for (clientCount = 1; clientCount <= MAX_CLIENTS; clientCount++) {
  const token = jwt.sign(PLAYLOAD, JWT_SECRET);
  const transports = ["websocket"];
  const playerId = 'Player_' + clientCount;
  const socket = io.connect(URL, {
    transports,
    query: { token, playerId: playerId },
  });

  socket.emit("tournamentStatus");
  logger.info(`Requested tournamentStatus ${playerId}`);
  requestSinceLastReport++;

  socket.on("tournamentStatus", (data) => {
    packetsSinceLastReport++;
    logger.info(`Received tournamentStatus:${data.tournamentStatus}  Player: ${playerId} tournamentID:${data.tournamentId} `);
  });

  socket.on("registrationOpen", (data) => {
    logger.info(`Received registrationOpen  `);
    packetsSinceLastReport++;
    //register to new tournament
    registrationData.tournamentId = data.tournamentId;
    socket.emit("registration", registrationData);
    logger.info(`Requested registration  ${playerId} tournamentID : ${JSON.stringify(data)}`);
    //already registred
    // socket.emit("registration", registrationData);
    requestSinceLastReport++;
  });

  socket.on("registration", (status) => {
    logger.info(`Received registration status ${JSON.stringify(status)} `);
    packetsSinceLastReport++;
  });

  socket.on("startTournament", (data) => {
    logger.info(`player startTournament  ${JSON.stringify(data)}`);
    packetsSinceLastReport++;
  });

  socket.on("endTournament", (data) => {
    logger.info(`player endTournament  ${JSON.stringify(data)}`);
    packetsSinceLastReport++;
  });

  socket.on("startRound", (data) => {
    logger.info(`player startRound  ${playerId} ${JSON.stringify(data)}`);
    socket.emit("playerAnswer", { selectedHen: 1, playerId: playerId, ...data });
    logger.info(`playerAnswers..${playerId}`);
    packetsSinceLastReport++;
  });

  socket.on("endRound", (data) => {
    logger.info(`player endRound  ${playerId} ${JSON.stringify(data)}`);
    socket.emit("playerAnswer", { selectedHen: 1, playerId: playerId, ...data });
    packetsSinceLastReport++;
  });

  socket.on("roundResult", (data) => {
    logger.info(`player roundResult, ${playerId} , ${JSON.stringify(data)}`);
    packetsSinceLastReport++;
  });

  socket.on("leaderBoard", (data) => {
    logger.info(`player leaderBoard, ${playerId} , ${JSON.stringify(data)}`);
    packetsSinceLastReport++;
  });

  socket.on("refund", (data) => {
    logger.info(`player refund, ${playerId} , ${JSON.stringify(data)}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });
}

const printReport = () => {
  const now = new Date().getTime();
  const durationSinceLastReport = (now - lastReport) / 1000;
  const packetsPerSeconds = (
    packetsSinceLastReport / durationSinceLastReport
  ).toFixed(2);
  requestCount += requestSinceLastReport;
  responseCount += packetsSinceLastReport;
  // console.log(`client: ${ clientCount } ; response: ${ packetsSinceLastReport }; request: ${ requestSinceLastReport }; pending:${ requestCount - responseCount } perSecond ${ packetsPerSeconds } `);

  packetsSinceLastReport = 0;
  requestSinceLastReport = 0;


  lastReport = now;
};

setInterval(printReport, 5000);