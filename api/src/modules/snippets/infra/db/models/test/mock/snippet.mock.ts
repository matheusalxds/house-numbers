import mongoose from 'mongoose'

import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'

export const mockSnippet = (): Snippet => ({
  _id: new mongoose.Types.ObjectId().toString(),
  createdAt: new Date(),
  summary: 'any_summary',
  text: 'any_text',
  updatedAt: new Date(),
})
