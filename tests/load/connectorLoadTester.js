const { io } = require("socket.io-client");

const URL = "http://localhost:3000";
const MAX_CLIENTS = 300;
const CLIENT_CREATION_INTERVAL_IN_MS = 50;
const EMIT_INTERVAL_IN_MS = 100;

let clientCount = 0;
let requestCount = 0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

const createClient = () => {
  
  const transports = ["websocket"]
  const socket = io(URL, {
    transports,
  });

  setInterval(() => {
    socket.emit("register");
    requestCount++;
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

  console.log(`client: ${clientCount} ; response: ${packetsSinceLastReport}; request: ${requestCount}; pending:${requestCount-packetsSinceLastReport} perSecond ${packetsPerSeconds}`);

  packetsSinceLastReport = 0;
  requestCount=0;


  lastReport = now;
};

setInterval(printReport, 5000);