import pino from 'pino'

export const logger = pino({
  transport: {
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      singleLine: true,
      translateTime: 'HH:MM:ss',
    },
    target: 'pino-pretty',
  },
})

