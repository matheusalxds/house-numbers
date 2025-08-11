import {
  Pagination,
  PaginationContent, PaginationCounter,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

type PaginationData = {
  counter: number;
  currentPage: number;
  pageCount: number;
  onChange: (page: number) => void;
};

export const Paginate = ({ counter, currentPage, pageCount, onChange }: PaginationData) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pageCount) onChange(newPage);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, '...', pageCount);
      } else if (currentPage >= pageCount - 2) {
        pages.push(1, '...', pageCount - 2, pageCount - 1, pageCount);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount);
      }
    }

    return pages;
  };

  return (
    counter > 0 && (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          </PaginationItem>
          {generatePageNumbers().map((pageNum, index) =>
            pageNum === '...' ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink isActive={pageNum === currentPage} onClick={() => handlePageChange(Number(pageNum))}>
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount} />
          </PaginationItem>
        </PaginationContent>
        <PaginationCounter counter={counter} />
      </Pagination>
    )
  );
};
