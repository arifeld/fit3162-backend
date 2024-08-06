/**
 * Custom logger using the winston package, which all other files should import.
 * Currently logs to console when in non-production environments; this is subject to change.
 */

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // transports = [] // can add this later if we wish
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    }));
};

module.exports = logger;