import { SnippetsRepository } from '@/modules/snippets/infra/db/repos/snippet.repo'

export const makeSnippetRepo = () => new SnippetsRepository()
