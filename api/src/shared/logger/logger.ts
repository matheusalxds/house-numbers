import pino, { Logger as PinoLogger } from 'pino'

import { LogMsgIn, LogMsgMidIn, msgEnd, msgMid, msgStart } from '@/shared/logger/log-msg'

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

  errorMsg = (logMs: string) => {
    this.log.error(logMs)
  }

  infoEnd = (logMs: LogMsgIn, data?: object) => {
    this.log.info(msgEnd(logMs, data))
  }

  infoMid = (logMs: LogMsgMidIn, data?: object) => {
    this.log.info(msgMid(logMs, data))
  }

  infoMsg = (logMs: string) => {
    this.log.info(logMs)
  }

  infoStart = (logMs: LogMsgIn, data?: object) => {
    this.log.info(msgStart(logMs, data))
  }
}
