import { Snippet } from '@/modules/snippets/domain/entities/snippet.entity'

export interface ISnippetsRepo {
  create: (params: Partial<Snippet>) => Promise<Snippet>
}
