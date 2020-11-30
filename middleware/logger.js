const path = require('path');
const { createLogger } = require('bunyan');
const level = process.env.NODE_LOGGING_LEVEL || 'info';

const log = createLogger({
  name: 'Employee_App',
  streams: [
    {
      level,
      stream: process.stdout,
    },
    {
      level,
      path: path.join(__dirname, '..', 'logs', 'logs.json'),
    },
  ],
});

module.exports = log;
