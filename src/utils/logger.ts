import chalk from 'chalk'; // Puedes omitir esto si no quieres colores
import * as fs from 'fs';
import * as path from 'path';

const logFilePath = path.join(__dirname, 'application.log');

const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
};

const writeToFile = (message) => {
  fs.appendFile(logFilePath, message + '\n', (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};

// Logger
export const logger = {
  log(level, message) {
    const formattedMessage = formatMessage(level, message);

    // Colores según el nivel
    const coloredMessage =
      {
        info: chalk.blue(formattedMessage),
        warning: chalk.yellow(formattedMessage),
        error: chalk.red(formattedMessage),
        debug: chalk.gray(formattedMessage),
      }[level] || formattedMessage;

    // Mostrar en consola
    console.log(coloredMessage);

    // Escribir en archivo
    writeToFile(formattedMessage);
  },

  info(message) {
    this.log('info', message);
  },

  warning(message) {
    this.log('warning', message);
  },

  error(message) {
    this.log('error', message);
  },

  debug(message) {
    this.log('debug', message);
  },
};

module.exports = logger;
