import { FC } from 'react';
import { PaginationInfo } from '../../App';

interface PaginationProps {
  paginationInfo: PaginationInfo;
  paginate: (pageNumber: number) => void;
}

const CustomPagination: FC<PaginationProps> = ({
  paginationInfo,
  paginate,
}) => {
  const { pages, next, prev } = paginationInfo;

  const pageNumbers: number[] = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = async () => {
    if (next) {
      const nextPageNumber = parsePageNumber(next);
      paginate(nextPageNumber);
    }
  };

  const handlePrevPage = async () => {
    if (prev) {
      const prevPageNumber = parsePageNumber(prev);
      paginate(prevPageNumber);
    }
  };

  const parsePageNumber = (url: string): number => {
    const parsedUrl = new URL(url);
    const page = parsedUrl.searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  };

  return (
    <div className="flex justify-center">
      <button onClick={handlePrevPage} disabled={!prev}>
        Previous
      </button>
      <ul className="flex">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={e => {
                e.preventDefault();
                paginate(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextPage} disabled={!next}>
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
