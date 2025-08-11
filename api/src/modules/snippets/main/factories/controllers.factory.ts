import { CreateSnippetController } from '@/modules/snippets/application/controllers/snippet-create.controller'
import { ListAllSnippetsController } from '@/modules/snippets/application/controllers/snippet-list-all.controller'
import { ListOneSnippetController } from '@/modules/snippets/application/controllers/snippet-list-one.controller'
import { CreateSnippetUC } from '@/modules/snippets/domain/use-cases/create-snippet'
import { FindAllSnippetsUC } from '@/modules/snippets/domain/use-cases/find-all-snippets'
import { FindOneSnippetUC } from '@/modules/snippets/domain/use-cases/find-one-snippet'
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

export const makeListAllSnippetsController = (): ListAllSnippetsController => {
  const repository = makeSnippetRepo()
  const findAll = new FindAllSnippetsUC(repository, makeLogger())
  return new ListAllSnippetsController(findAll, makeLogger())
}

export const makeListOneSnippetController = (): ListOneSnippetController => {
  const repository = makeSnippetRepo()
  const findOne = new FindOneSnippetUC(repository, makeLogger())
  return new ListOneSnippetController(findOne, makeLogger())
}
