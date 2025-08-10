import { CreateSnippetController } from '@/modules/snippets/application/controllers/snippet-create.controller'
import { CreateSnippetUC } from '@/modules/snippets/domain/use-cases/create-snippet'
import { UpdateSnippetUC } from '@/modules/snippets/domain/use-cases/update-snippet'
import { makeIA } from '@/modules/snippets/main/factories/ia.factory'
import { makeSnippetRepo } from '@/modules/snippets/main/factories/repos.factory'

export const makeCreateSnippetController = (): CreateSnippetController => {
  const repository = makeSnippetRepo()
  const createUC = new CreateSnippetUC(repository)
  const updateUC = new UpdateSnippetUC(repository)
  return new CreateSnippetController(makeIA(), createUC, updateUC)
}
