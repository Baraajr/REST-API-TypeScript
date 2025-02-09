import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  transport: {
    target: 'pino-pretty', // Enable pretty printing
    options: {
      colorize: true, // Additional pretty print options
    },
  },
  base: {
    pid: false, // Remove the 'pid' field from logs
  },
  timestamp: () => `,"time":"${dayjs().format()}"`, // Custom timestamp
});

export default log;
