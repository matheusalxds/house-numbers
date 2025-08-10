import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  name?: string
  password: string
}

const UserSchema = new Schema<IUser>(
  {
    email: { lowercase: true, required: true, trim: true, type: String, unique: true },
    name: { type: String },
    password: { minlength: 8, required: true, type: String },
  },
  { timestamps: true },
)

export const UserModel = model<IUser>('User', UserSchema)
