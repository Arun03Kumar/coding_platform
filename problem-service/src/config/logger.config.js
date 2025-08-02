const winston = require("winston");

const allowedTransport = [];
allowedTransport.push(new winston.transports.Console());

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      (log) => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`
    )
  ),
  transports: allowedTransport,
});

module.exports = logger;
