const Redis = require("ioredis");
const JSONCache = require("redis-json");
const logger = require('./config/logger');
const redis = new Redis();

const jsonCache = new JSONCache(redis, { prefix: 'cache:' });

async function setTournamentStatus(tournamentStaus) {
  jsonCache.set('tournamentStatus', tournamentStaus);
}

async function getTournamentStatus() {
  return jsonCache.get('tournamentStatus');
}

async function getRegistrationStatus(playerID) {
  return getTournamentPlayer(playerID).then((player) => {
    logger.info('playerID::::' + playerID);
    return player.registrationStatus;
  })

}

async function setRegistrationStatus(playerID, registrationStatus) {
  return getTournamentPlayer(playerID).then((player) => {
    player.registrationStatus = registrationStatus;
    return setTournamentPlayer(playerID, player);
  })
}

async function getTournamentPlayer(playerID) {
  return jsonCache.get('tournamentPlayers').then((tournamentPlayers) => {
    logger.info(JSON.stringify(tournamentPlayers));
    return tournamentPlayers[playerID];
  });
}

async function setTournamentPlayer(playerID, tournamentPlayer) {
  return jsonCache.get('tournamentPlayers').then((tournamentPlayers) => {
    if (tournamentPlayers == undefined) tournamentPlayers = {};
    tournamentPlayers[playerID] = tournamentPlayer;
    return jsonCache.set('tournamentPlayers', tournamentPlayers);
  })
}


async function getRoundData() {
  logger.info(`getting round data....`);
  return jsonCache.get('roundData');
}

async function setRoundData(roundData) {
  logger.info(`setting round data....${JSON.stringify(roundData)}`);
  jsonCache.set('roundData', roundData);
}

async function getNextRoundData() {
  return getRoundData().then(roundData => {
    roundData.roundNumber = roundData.roundNumber + 1;
    return roundData;
  });
}

async function clearCache(message) {
  logger.info('Clearing all the Redis Cache :' + message);
}

module.exports = { getTournamentStatus, setTournamentStatus, clearCache, getRegistrationStatus, setRegistrationStatus, getTournamentPlayer, setTournamentPlayer, getRoundData }
