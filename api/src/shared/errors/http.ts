export class NotFoundError extends Error {
  constructor(fieldName?: string) {
    const message = fieldName === undefined ? '' : `${fieldName} not found`
    super(message)
    this.name = 'NotFoundError'
    this.message = message
  }
}

export class ServerError extends Error {
  constructor(error: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error.stack
  }
}
