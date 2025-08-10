import { Schema } from 'mongoose'

export const updatedAt = (schema: Schema): void => {
  schema.add({ updatedAt: { default: Date.now, type: Date } })
  schema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() })
    next()
  })
}
