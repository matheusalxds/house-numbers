import { CreateSnippetController } from '@/modules/snippets/application/controllers/snippet-create.controller'
import { CreateSnippetUC } from '@/modules/snippets/domain/use-cases/create-snippet'
import { UpdateSnippetUC } from '@/modules/snippets/domain/use-cases/update-snippet'
import { makeIA } from '@/modules/snippets/main/factories/ia.factory'
import { makeSnippetRepo } from '@/modules/snippets/main/factories/repos.factory'
import { makeLogger } from '@/shared/factories/logger.factory'

export const makeCreateSnippetController = (): CreateSnippetController => {
  const repository = makeSnippetRepo()
  const logger = makeLogger()
  const createUC = new CreateSnippetUC(repository, logger)
  const updateUC = new UpdateSnippetUC(repository, logger)
  return new CreateSnippetController(makeIA(), createUC, updateUC, logger)
}
