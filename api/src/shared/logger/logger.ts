import pino, { Logger as PinoLogger } from 'pino'

import { LogMsgIn, msgEnd, msgStart } from '@/shared/logger/log-msg'

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

export interface ILogger {
  error: (params: LogMsgIn, data?: object) => void
  infoEnd: (params: LogMsgIn, data?: object) => void
  infoStart: (params: LogMsgIn, data?: object) => void
}

export class Logger implements ILogger {
  private log: PinoLogger

  constructor() {
    this.log = pino({
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
  }

  error = (logMs: LogMsgIn, data?: object): void => {
    this.log.error(msgEnd(logMs, data))
  }

  infoEnd = (logMs: LogMsgIn, data?: object) => {
    this.log.info(msgEnd(logMs, data))
  }

  infoStart = (logMs: LogMsgIn, data?: object) => {
    this.log.info(msgStart(logMs, data))
  }
}
