
function getChanelName(socket){
  const sid=socket.id;
  const userid=socket.handshake.query.userid;
  const clientip=socket.handshake.address;
  return `${userid}.${clientip}.${sid}`;
}
module.exports = getChanelName;