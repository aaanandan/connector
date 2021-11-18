require('should');
const assert = require('assert');

const io = require("socket.io-client");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisisasamplesecret';
const URL = "http://localhost:3000";
const PLAYLOAD = 'playload';


describe("Able to connect to socket server connector ", function () {
  let socket;


  before(function (done) {
    const token = jwt.sign(PLAYLOAD, JWT_SECRET);
    const transports = ["websocket"];
    socket = io.connect(URL, {
      transports,
      query: { token }
    });
    // server= require('../../src/connector.js')
    done();
  });

  after(function (done) {
    socket.disconnect();
    // server.close();
    done();
  });

  // it("tournamentStatus - INACTIVE-1", (done) => {
  //   socket.emit('tournamentStatus');
  //   socket.once('tournamentStatus', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tornamentStatus').which.is.not.empty();
  //     data.should.have.property('plannedStart').which.is.not.empty();
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();
  //     data.should.have.property('registrationDuration').which.is.not.empty();
  //     data.should.have.property('timeZone').which.is.not.empty();
  //     data.should.have.property('maxPlayer').which.is.not.empty();
  //     data.should.have.property('minPlayer').which.is.not.empty();
  //     data.should.have.property('requiredCookies').which.is.not.empty();
  //     data.should.have.property('requiredGoldenEggs').which.is.not.empty();
  //     done();
  //   });
  // });
  it("tournamentStatus - ACTIVE-2", (done) => {
    socket.emit('tournamentStatus');
    socket.on('tournamentStatus', (data) => {
      console.log('tournamentStatus::', data);
      // data.should.be.an.Object().and.not.empty();
      // // data.should.have.property('Data');
      // data.should.be.an.Object().and.not.empty();
      // data.should.have.property('tornamentStatus').which.is.not.empty();
      // data.should.have.property('plannedStart').which.is.not.empty();
      // data.should.have.property('tournamentName').which.is.not.empty();
      // data.should.have.property('tournamentId').which.is.not.empty();
      // data.should.have.property('registrationDuration').which.is.not.empty();
      // data.should.have.property('timeZone').which.is.not.empty();
      // data.should.have.property('maxPlayer').which.is.not.empty();
      // data.should.have.property('minPlayer').which.is.not.empty();
      // data.should.have.property('requiredCookies').which.is.not.empty();
      // data.should.have.property('requiredGoldenEggs').which.is.not.empty();
      done();
    });
  });
  // it("tournamentStatus - SCHEDULED-3", (done) => {    
  //   socket.emit('tournamentStatus');
  //   socket.on('tournamentStatus', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tornamentStatus').which.is.not.empty();
  //     data.should.have.property('plannedStart').which.is.not.empty();      
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();
  //     data.should.have.property('registrationDuration').which.is.not.empty();
  //     data.should.have.property('timeZone').which.is.not.empty();
  //     data.should.have.property('maxPlayer').which.is.not.empty();
  //     data.should.have.property('minPlayer').which.is.not.empty();
  //     data.should.have.property('requiredCookies').which.is.not.empty();
  //     data.should.have.property('requiredGoldenEggs').which.is.not.empty();      
  //     done();
  //     });
  // });
  // it("tournamentStatus - REGISTRATION CLOSED-4", (done) => {    
  //   socket.emit('tournamentStatus');
  //   socket.on('tournamentStatus', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tornamentStatus').which.is.not.empty();
  //     data.should.have.property('plannedStart').which.is.not.empty();      
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();
  //     data.should.have.property('registrationDuration').which.is.not.empty();
  //     data.should.have.property('timeZone').which.is.not.empty();
  //     data.should.have.property('maxPlayer').which.is.not.empty();
  //     data.should.have.property('minPlayer').which.is.not.empty();
  //     data.should.have.property('requiredCookies').which.is.not.empty();
  //     data.should.have.property('requiredGoldenEggs').which.is.not.empty();      
  //     done();
  //     });
  // });
  // it("registrationOpen - SCHEDULED-OPEN-1", (done) => {    
  //   socket.on('registrationOpen', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();      
  //     done();
  //     });
  // });
  // it("registrationClosed - REGISTRATION TIMEOUT-1", (done) => {    
  //   socket.on('registrationClosed', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();
  //     data.should.have.property('reason').which.is.not.empty();
  //     done();
  //     });
  // });
  // it("registrationClosed - MAX PLAYERS-2", (done) => {    
  //   socket.on('registrationClosed', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();   
  //     data.should.have.property('reason').which.is.not.empty();   
  //     done();
  //     });
  // });

  // it("startTournament - TIMEOUT-1", (done) => {    
  //   socket.on('startTournament', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();
  //     data.should.have.property('reason').which.is.not.empty();      
  //     done();
  //     });
  // });
  // it("startTournament - MAX PLAYERS-2", (done) => {    
  //   socket.on('registrationClosed', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('reason').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("refund - NO MINIMUM PLAYERS-1", (done) => {    
  //   socket.on('refund', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('tournamentName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('reason').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("refund - NO MINIMUM PLAYERS-1", (done) => {    
  //   socket.on('refund', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('registrationRefundedBy').which.is.not.empty();
  //     data.should.have.property('count').which.is.not.empty();
  //     data.should.have.property('reason').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("startRound -1", (done) => {    
  //   socket.on('startRound', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('correctHen').which.is.not.empty();
  //     data.should.have.property('shufflingCount').which.is.not.empty();
  //     data.should.have.property('distraction').which.is.not.empty();      
  //     data.should.have.property('roundDuration').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("usePowerUp - SHUFFLE-1", (done) => {    
  //   let powerupUsed={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     powerUsed:'slowSpeed',
  //     round:1,
  //     TimeStamp:545444544,
  //     }
  //   socket.emit('usePowerUp',powerupUsed);
  //   socket.on('usePowerUp', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('powerUsed').which.is.not.empty();
  //     data.should.have.property('shuffleRemaining').which.is.not.empty();      
  //     data.should.have.property('removeHenRemaining').which.is.not.empty();
  //     data.should.have.property('slowSpeedRemaining').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("usePowerUp - REMOVE HEN-2", (done) => {    
  //   let powerupUsed={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     powerUsed:'slowSpeed',
  //     round:1,
  //     TimeStamp:545444544,
  //     }
  //   socket.emit('usePowerUp',powerupUsed);
  //   socket.on('usePowerUp', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('powerUsed').which.is.not.empty();
  //     data.should.have.property('shuffleRemaining').which.is.not.empty();      
  //     data.should.have.property('removeHenRemaining').which.is.not.empty();
  //     data.should.have.property('slowSpeedRemaining').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("usePowerUp - SLOW SPEED-3", (done) => {    
  //   let powerupUsed={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     powerUsed:'slowSpeed',
  //     round:1,
  //     TimeStamp:545444544,
  //     }
  //   socket.emit('usePowerUp',powerupUsed);
  //   socket.on('usePowerUp', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('powerUsed').which.is.not.empty();
  //     data.should.have.property('shuffleRemaining').which.is.not.empty();      
  //     data.should.have.property('removeHenRemaining').which.is.not.empty();
  //     data.should.have.property('slowSpeedRemaining').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("usePowerUp - NOT ENOUNG POWER UPS-4", (done) => {    
  //   let powerupUsed={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     powerUsed:'slowSpeed',
  //     round:1,
  //     TimeStamp:545444544,
  //     }
  //   socket.emit('usePowerUp',powerupUsed);
  //   socket.on('usePowerUp', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('powerUsed').which.is.not.empty();
  //     data.should.have.property('shuffleRemaining').which.is.not.empty();      
  //     data.should.have.property('removeHenRemaining').which.is.not.empty();
  //     data.should.have.property('slowSpeedRemaining').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("usePowerUp - ALREADY USED REMOVE HEN-5", (done) => {    
  //   let powerupUsed={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     powerUsed:'slowSpeed',
  //     round:1,
  //     TimeStamp:545444544,
  //     }
  //   socket.emit('usePowerUp',powerupUsed);
  //   socket.on('usePowerUp', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('powerUsed').which.is.not.empty();
  //     data.should.have.property('shuffleRemaining').which.is.not.empty();      
  //     data.should.have.property('removeHenRemaining').which.is.not.empty();
  //     data.should.have.property('slowSpeedRemaining').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("usePowerUp - ALREADY USED SHEUFFLE-6", (done) => {    
  //   let powerupUsed={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     powerUsed:'slowSpeed',
  //     round:1,
  //     TimeStamp:545444544,
  //     }
  //   socket.emit('usePowerUp',powerupUsed);
  //   socket.on('usePowerUp', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('powerUsed').which.is.not.empty();
  //     data.should.have.property('shuffleRemaining').which.is.not.empty();      
  //     data.should.have.property('removeHenRemaining').which.is.not.empty();
  //     data.should.have.property('slowSpeedRemaining').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("usePowerUp - ALREADY USED SLOW SPEED-7", (done) => {    
  //   let powerupUsed={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     powerUsed:'slowSpeed',
  //     round:1,
  //     TimeStamp:545444544,
  //     }
  //   socket.emit('usePowerUp',powerupUsed);
  //   socket.on('usePowerUp', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('powerUsed').which.is.not.empty();
  //     data.should.have.property('shuffleRemaining').which.is.not.empty();      
  //     data.should.have.property('removeHenRemaining').which.is.not.empty();
  //     data.should.have.property('slowSpeedRemaining').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("playerAnswer - SELECTS-FIRST HEN-1", (done) => {    
  // let playerAnswer={
  //   playerId:'10000',
  //   TournamentId:'001',
  //   round:'1',
  //   TimeStamp:'545444544',
  //   selectHen : '1'
  // }

  // socket.emit('playerAnswer',playerAnswer);
  //   socket.on('playerAnswer', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('correctHenIndex').which.is.not.empty();    
  //     done();
  //     });
  // });
  // it("playerAnswer - SELECTS-SECOND HEN-2", (done) => {    
  // let playerAnswer={
  // playerId:'10000',
  // TournamentId:'001',
  // round:'1',
  // TimeStamp:'545444544',
  // selectHen : '1'
  // }

  // socket.emit('playerAnswer',playerAnswer);
  // socket.on('playerAnswer', (data) => {
  //   data.should.be.an.Object().and.not.empty();
  //   // data.should.have.property('Data');
  //   data.should.be.an.Object().and.not.empty();
  //   data.should.have.property('roundNumber').which.is.not.empty();
  //   data.should.have.property('tournamentId').which.is.not.empty();  
  //   data.should.have.property('playerId').which.is.not.empty();
  //   data.should.have.property('correctHenIndex').which.is.not.empty();    
  //   done();
  //   });
  // });
  // it("playerAnswer - SELECTS-THIRD HEN-3", (done) => {    
  // let playerAnswer={
  //   playerId:'10000',
  //   TournamentId:'001',
  //   round:'1',
  //   TimeStamp:'545444544',
  //   selectHen : '1'
  // }

  // socket.emit('playerAnswer',playerAnswer);
  //   socket.on('playerAnswer', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('roundNumber').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('correctHenIndex').which.is.not.empty();    
  //     done();
  //     });
  // });
  // it("playerAnswer - LEAVES-BLANK HEN-4", (done) => {    
  //   let playerAnswer={
  //     playerId:'10000',
  //     TournamentId:'001',
  //     round:'1',
  //     TimeStamp:'545444544',
  //     selectHen : '1'
  //   }

  //   socket.emit('playerAnswer',playerAnswer);
  //     socket.on('playerAnswer', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('correctHenIndex').which.is.not.empty();    
  //       done();
  //       });
  // });

  // it("registeration - BY COOKIE-1", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });

  // it("registeration - BY GOLDEN EGGS-2", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });

  // it("registeration - ALREADY REGISTRED FOR THIS TOURNAMENT BY COOKIE-3", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });

  // it("registeration - ALREADY REGISTRED FOR THIS TOURNAMENT BY GOLDEN EGGS-4", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });

  // it("registeration - NOT ENOUGH COOKIES-5", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });

  // it("registeration - NOT ENOUGH GOLDEN EGG-6", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });

  // it("registeration - ALREADY PLAYED USING COOKIE TODAY-7", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });

  // it("registeration - INVALID TOKEN-8", (done) => {    
  //   let registerationData={
  //     playerId: '0001',
  //     userName: 'moroco',
  //     registrationBy:'cookie',
  //     registrationTimestamp:'545454',
  //     tournamentId:'001'
  //     }

  //   socket.emit('registeration',registerationData);
  //   socket.on('registeration', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();  
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('status').which.is.not.empty();
  //     data.should.have.property('isBlocked').which.is.not.empty();      
  //     done();      
  // });
  // });


  // it("rejoin - BEFORE FIRST ROUND-1", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // });

  // it("rejoin - AFTER FIRST ROUND-2", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // });

  // it("rejoin - NEXT ROUND ANSWRED CORRECT-3", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // }); 

  // it("rejoin - NEXT ROUND ANSWRED WRONG-4", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // }); 

  // it("rejoin - NOT COMMING ON NEXT ROUND ANSWRED CORRECT-5", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // }); 

  // it("rejoin - NOT COMMING ON NEXT ROUND ANSWRED WRONG-6", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // }); 

  // it("rejoin - SAME ROUND-7", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // }); 

  // it("rejoin - TOURNOMENT OVER-ANSWRED CORRECT-8", (done) => {    
  //   let rejoinData={
  //     playerId:'10000',
  //     userName: 'maroco',
  //     TournamentId:'001',
  //     roundNumber:'1',
  //     lastRoundAnswer:'1',
  //   }     

  //   socket.emit('rejoin',rejoinData);
  //     socket.on('rejoin', (data) => {
  //       data.should.be.an.Object().and.not.empty();
  //       // data.should.have.property('Data');
  //       data.should.be.an.Object().and.not.empty();
  //       data.should.have.property('roundNumber').which.is.not.empty();
  //       data.should.have.property('tournamentId').which.is.not.empty();  
  //       data.should.have.property('playerId').which.is.not.empty();
  //       data.should.have.property('useName').which.is.not.empty();    
  //       data.should.have.property('isBlocked').which.is.not.empty();    
  //       data.should.have.property('status').which.is.not.empty();
  //       done();

  //       });
  // }); 

  // it("endTournament-1", (done) => {    
  //   socket.on('endTournament', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();      
  //     done();
  //     });
  // });

  // it("leaderBoard - 1", (done) => {    
  //   socket.on('leaderBoard', (data) => {
  //     data.should.be.an.Object().and.not.empty();
  //     // data.should.have.property('Data');
  //     data.should.be.an.Object().and.not.empty();
  //     data.should.have.property('playerId').which.is.not.empty();
  //     data.should.have.property('userName').which.is.not.empty();
  //     data.should.have.property('tournamentId').which.is.not.empty();
  //     data.should.have.property('goldenEggs').which.is.not.empty();
  //     data.should.have.property('lootEggs').which.is.not.empty();
  //     data.should.have.property('avgTime').which.is.not.empty();      
  //     data.should.have.property('rank').which.is.not.empty();
  //     data.should.have.property('isChampion').which.is.not.empty();
  //     done();
  //     });
  // });

});