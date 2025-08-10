import { describe, expect, it } from 'vitest'

import { Pagination } from '@/shared/db/dto/pagination'

interface Example {
  id: string
  name: string
}

describe('Pagination', () => {
  it('should parse mongoose pagination to paginate class correctly', () => {
    const mockPaginateResult = {
      docs: [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
      ],
      hasNextPage: false,
      hasPrevPage: false,
      limit: 10,
      nextPage: null,
      offset: 0,
      page: 1,
      pagingCounter: 1,
      prevPage: null,
      totalDocs: 2,
      totalPages: 1,
    }

    const paginated = new Pagination<Example>(mockPaginateResult)

    expect(paginated.data.length).toBe(2)
    expect(paginated.data[0].id).toBe('1')
    expect(paginated.total).toBe(2)
    expect(paginated.limit).toBe(10)
    expect(paginated.page).toBe(1)
  })

  it('should return correct values if no data was found', () => {
    const paginated = new Pagination<Example>({
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      limit: 0,
      nextPage: null,
      offset: 0,
      page: undefined,
      pagingCounter: 0,
      prevPage: null,
      totalDocs: 0,
      totalPages: 0,
    })

    expect(paginated.data).toEqual([])
    expect(paginated.total).toBe(0)
    expect(paginated.limit).toBe(0)
    expect(paginated.page).toBe(0)
  })
})
