require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: '+09:00',
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: '+09:00',
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_PRODUCTION_USERNAME,
    password: process.env.DB_PRODUCTION_PASSWORD,
    database: process.env.DB_PRODUCTION_NAME,
    timezone: '+09:00',
    host: process.env.DB_PRODUCTION_HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
};
