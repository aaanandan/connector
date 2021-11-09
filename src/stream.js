const redis = require('redis');
let redisClient = redis.createClient();
const logger = require('./config/logger');

const PLAYER_STREAM = "connector:player";

// produce the message
function pushToQueue(data){
    redisClient.xadd(PLAYER_STREAM, '*', 
    'data', data, 
    function (err) { 
            if (err) { 
                logger.error('err');
                //update redis error tables?
            };
        });
}
module.exports=pushToQueue