const Redis = require("ioredis");
const redis = new Redis();
const logger = require('./config/logger');

const PLAYER_STREAM = "connector:player";

// produce the message
function pushToQueue(data) {
    redis.xadd(PLAYER_STREAM, '*', 'data', JSON.stringify(data), function (err) {
        logger.error(err);
    });

}
module.exports = { pushToQueue }