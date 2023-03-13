import winston from 'winston'
import {config} from 'dotenv'
import {ENVIRONMENT} from '../constants'

config()

const myformat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.level} ${info.message || info.stack}`
    )
  );
  
  /**
   * Winston logger
   */
  type loggerLevel = 'warning' | 'error' | 'info'

  const devLogger = winston.createLogger({
    // level: K loggerLevel,
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        maxsize: 500,
        format: myformat,
      }),
      new winston.transports.Console({
        format: myformat,
      }),
    ],
  });
  
  const prodLogger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        maxsize: 500,
        format: myformat,
      }),
    ],
  });
  // type loggerLevel = 'warning' | 'error' | 'info'
  

// export globalThis = true; 

export function logger<T>(level: loggerLevel, logInfo: T) {
    if (ENVIRONMENT === 'development') {
      return devLogger.log(level, logInfo);
    }
    return prodLogger.log(level, logInfo);
}
  