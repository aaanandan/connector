const Redis = require("ioredis");
const JSONCache = require("redis-json");
const logger = require('./config/logger');

const redis = new Redis();

const tournamentPlayer = {
  userid: 'userid',
  token:'avalidtoken',
  lastRoundPlayed:1,  
  scores:[{},{}],
  registrationData:{joinedUsing:'',count:''},
  prize:{},
  status:{active:true,eliminated:false,winner:false,disconnected:false}
}

const jsonCache = new JSONCache(redis, {prefix: 'cache:'});

async function setTounamentStatus(tournamentStaus){
  await jsonCache.set('tournamentStaus', tournamentStaus);
}

async function getTounamentStatus(){
  logger.info('getTournamentStats');
   return await jsonCache.get('tournamentStaus');
}

async function getRegistrationStatus(){
  logger.info('getTournamentStats');
   return await jsonCache.get('tournamentStaus');
}

module.exports = { getTounamentStatus, setTounamentStatus, getRegistrationStatus}

