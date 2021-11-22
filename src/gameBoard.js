const Redis = require("ioredis");
const JSONCache = require("redis-json");
const logger = require('./config/logger');
const redis = new Redis();

const tournamentPlayer = {
  userid: 'userid',
  token: 'avalidtoken',
  lastRoundPlayed: 1,
  scores: [{}, {}],
  registrationData: { joinedUsing: '', count: '' },
  prize: {},
  status: { active: true, eliminated: false, winner: false, disconnected: false }
}

const jsonCache = new JSONCache(redis, { prefix: 'cache:' });

async function setTounamentStatus(tournamentStaus) {
  // logger.info('setTournamentStatus:::' + JSON.stringify(tournamentStaus));
  // logger.info('getTournamentStatus : ' + JSON.stringify(await jsonCache.get('tournamentStauts')));
  jsonCache.set('tournamentStauts', tournamentStaus);

}

async function getTounamentStatus() {
  return jsonCache.get('tournamentStauts');
}

async function clearCache(message) {
  logger.info('Clearing all the Redis Cache :' + message);
  // await jsonCache.clearAll();
}

module.exports = { getTounamentStatus, setTounamentStatus, clearCache }
