const { io } = require("socket.io-client");
const jwt = require('jsonwebtoken');
const JWT_SECRET='thisisasamplesecret';


const URL = "http://localhost:3000";
const MAX_CLIENTS = 600;
const CLIENT_CREATION_INTERVAL_IN_MS = 50;
const EMIT_INTERVAL_IN_MS = 200;
const PLAYLOAD='playload';

let clientCount = 0;
let requestSinceLastReport = 0, requestCount=0, responseCount=0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

const createClient = () => {
  
  const token = jwt.sign(PLAYLOAD, JWT_SECRET);
  const transports = ["websocket"];
  const socket = io.connect(URL, {
    transports,
    query: {token}
  });

  setInterval(() => {
    socket.emit("register");
    requestSinceLastReport++;
  }, EMIT_INTERVAL_IN_MS);

  socket.on("register", () => {
    packetsSinceLastReport++;
  });

  socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
  });

  if (++clientCount < MAX_CLIENTS) {
    setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
  }
};

createClient();

const printReport = () => {
  const now = new Date().getTime();
  const durationSinceLastReport = (now - lastReport) / 1000;
  const packetsPerSeconds = (
    packetsSinceLastReport / durationSinceLastReport
  ).toFixed(2);
  requestCount+=requestSinceLastReport;
  responseCount+=packetsSinceLastReport;
  console.log(`client: ${clientCount} ; response: ${packetsSinceLastReport}; request: ${requestSinceLastReport}; pending:${requestCount-responseCount} perSecond ${packetsPerSeconds}`);

  packetsSinceLastReport = 0;
  requestSinceLastReport=0;


  lastReport = now;
};

setInterval(printReport, 5000);