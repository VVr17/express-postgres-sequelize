#!/usr/bin/env node
// import * as dotenv from 'dotenv';
const dotenv = require('dotenv');
const http = require('http');
const Sequelize = require('sequelize');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();
const App = require('../app');

dotenv.config();
const { POSTGRES_URL } = process.env;
// const sequelize = new Sequelize(POSTGRES_URL); // Connect DB using URL
const sequelize = new Sequelize(config.postgres.options); // Connect with options

function connectToDb() {
  sequelize
    .authenticate()
    .then(() => {
      log.info('Connection Postgres DB has been established successfully.');
    })
    .catch(error => {
      log.error('Unable to connect to the database:', error);
      process.exit(1);
    });

  return sequelize;
}

const postgresClient = connectToDb();
config.postgres.client = postgresClient;

const app = App(config);

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);

server.on('listening', () => {
  log.info(
    `I'm listening on port ${server.address().port} in ${app.get('env')} mode.`
  );
});

server.on('error', error => {
  log.error(error);
});
