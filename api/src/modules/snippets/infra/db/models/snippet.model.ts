import { model, PaginateModel, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'
import { createdAt } from '@/shared/db/plugins/created-at'
import { updatedAt } from '@/shared/db/plugins/updated-at'

const snippetSchema = new Schema<Snippet>(
  {
    summary: { required: false, type: String },
    text: { required: true, type: String },
  },
  {
    versionKey: false,
  },
)

snippetSchema.plugin(createdAt)
snippetSchema.plugin(updatedAt)
snippetSchema.plugin(mongoosePaginate)

export const SnippetModel = model<Snippet, PaginateModel<Snippet>>('Snippet', snippetSchema)
