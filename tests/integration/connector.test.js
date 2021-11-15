const  assert = require("chai");

const { io } = require("socket.io-client");
const jwt = require('jsonwebtoken');
const logger = require("../../src/config/logger");
const JWT_SECRET='thisisasamplesecret';
const URL = "http://localhost:3000";
const PLAYLOAD='playload';


describe("create Client to connector", () => {
    const token = jwt.sign(PLAYLOAD, JWT_SECRET);
    const transports = ["websocket"];
    const socket = io.connect(URL, {
        transports,
        query: {token}
      });;     


it("able to connect to connecter and request tournamet status", (done) => {
    socket.emmit("tournamentStatus");
    socket.on("tournamentStatus", (data) => {
        assert.isNotEmpty(data);
        done();
      });
  });
  

});