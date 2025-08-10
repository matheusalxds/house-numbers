export interface LogMsgIn {
  fn: string
  origin: string
}
export interface LogMsgMidIn {
  msg: string
  origin: string
}

interface LogMsgOut {
  data?: object
  msg: string
}

export const msgStart = (msg: LogMsgIn, data?: object): LogMsgOut => ({
  msg: `${msg.origin} - ${msg.fn} - Start`,
  ...(data && data),
})

export const msgMid = (msg: LogMsgMidIn, data?: object): LogMsgOut => ({
  msg: `${msg.origin} - ${msg.msg}`,
  ...(data && data),
})

export const msgEnd = (msg: LogMsgIn, data?: object): LogMsgOut => ({
  msg: `${msg.origin} - ${msg.fn} - End`,
  ...(data && data),
})
