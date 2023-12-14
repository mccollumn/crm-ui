import winston from "winston";
import { htmlEscape } from "./utils/utils";
const { combine, timestamp, simple, printf, colorize } = winston.format;

const MAX_FILE_SIZE_BYTES = 10000000; // 10MB
const MAX_FILES = 1;

const logFormat = printf(
  ({ timestamp, level, message, stack, requestOptions }) => {
    return `${timestamp} ${level}: ${message}${stack ? ` ${stack}` : ""}${
      requestOptions ? ` ${htmlEscape(JSON.stringify(requestOptions))}` : ""
    }`;
  }
);

const logger = winston.createLogger({
  format: combine(timestamp(), simple(), logFormat),
  transports: [
    new winston.transports.File({
      filename: "logs/app-error.log",
      level: "error",
      maxsize: MAX_FILE_SIZE_BYTES,
      maxFiles: MAX_FILES,
    }),
    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
      maxsize: MAX_FILE_SIZE_BYTES,
      maxFiles: MAX_FILES,
    }),
    new winston.transports.Console({
      level: "info",
      format: combine(colorize()),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: "logs/app-exceptions.log",
      maxsize: MAX_FILE_SIZE_BYTES,
      maxFiles: MAX_FILES,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: "logs/app-rejections.log",
      maxsize: MAX_FILE_SIZE_BYTES,
      maxFiles: MAX_FILES,
    }),
  ],
  exitOnError: false,
});

export { logger };
