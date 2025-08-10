import { Schema } from 'mongoose';

export const createdAt = (schema: Schema): void => {
  schema.add({ createdAt: { default: Date.now, type: Date } });
};
