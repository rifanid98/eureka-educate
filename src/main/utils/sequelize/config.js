require('dotenv').config();

module.exports = {
  local: {
    database: process.env.DB_NAME_LOCAL,
    username: process.env.DB_USER_LOCAL,
    password: process.env.DB_PASS_LOCAL,
    host: process.env.DB_HOST_LOCAL,
    port: process.env.DB_PORT_LOCAL,
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  refactor: {
    database: process.env.DB_NAME_REFACTOR,
    username: process.env.DB_USER_REFACTOR,
    password: process.env.DB_PASS_REFACTOR,
    host: process.env.DB_HOST_REFACTOR,
    port: process.env.DB_PORT_REFACTOR,
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  development: {
    database: process.env.DB_NAME_DEVELOPMENT,
    username: process.env.DB_USER_DEVELOPMENT,
    password: process.env.DB_PASS_DEVELOPMENT,
    host: process.env.DB_HOST_DEVELOPMENT,
    port: process.env.DB_PORT_DEVELOPMENT,
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  staging: {
    database: process.env.DB_NAME_STAGING,
    username: process.env.DB_USER_STAGING,
    password: process.env.DB_PASS_STAGING,
    host: process.env.DB_HOST_STAGING,
    port: process.env.DB_PORT_STAGING,
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
  production: {
    database: process.env.DB_NAME_PRODUCTION,
    username: process.env.DB_USER_PRODUCTION,
    password: process.env.DB_PASS_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    port: process.env.DB_PORT_PRODUCTION,
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
  },
};
