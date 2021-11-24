
function getChanelName(socket) {
  const sid = socket.id;
  const playerId = socket.handshake.query.playerId;
  const clientip = socket.handshake.address;
  return `${playerId}.${clientip}.${sid}`;
}
module.exports = getChanelName;