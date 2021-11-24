const Redis = require("ioredis");
const redisio = new Redis();

const logger = require('./config/logger');

const PLAYER_STREAM = "connector:player";

// produce the message
function pushToQueue(data) {
    redisio.xadd(PLAYER_STREAM, '*', 'data', JSON.stringify(data), function (err) {
        logger.error(err);
    });
}
module.exports = { pushToQueue }