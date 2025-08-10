import { describe, expect, it } from 'vitest'

import { LogMsgIn, msgEnd, msgStart } from '../log-msg'

const msgParams: LogMsgIn = { fn: 'fnName', origin: 'ClassName' }
const msgData = { info: 'any_info' }

describe('LogMsg', () => {
  describe('msgStart', () => {
    it('should return correct msg and data', () => {
      const response = msgStart(msgParams, msgData)

      expect(response).toEqual({ ...msgData, msg: 'ClassName - fnName - Start' })
    })

    it('should return only msg if data is not provided', () => {
      const response = msgStart(msgParams)

      expect(response).toEqual({ msg: 'ClassName - fnName - Start' })
    })
  })

  describe('msgEnd', () => {
    it('should return correct msg and data', () => {
      const response = msgEnd(msgParams, msgData)

      expect(response).toEqual({ ...msgData, msg: 'ClassName - fnName - End' })
    })

    it('should return only msg if data is not provided', () => {
      const response = msgStart(msgParams)

      expect(response).toEqual({ msg: 'ClassName - fnName - Start' })
    })
  })
})
