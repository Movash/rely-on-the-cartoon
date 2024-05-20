import { FC } from 'react';
import sprite from '../../assets/icons/sprite.svg';

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface PaginationProps {
  paginationInfo: PaginationInfo;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const CustomPagination: FC<PaginationProps> = ({
  paginationInfo,
  paginate,
  currentPage,
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
    <div className="flex justify-center gap-[10px]">
      <button
        className={`bg-slate-300 rounded-full w-7 h-7 flex items-center justify-center transition-colors ${
          prev ? 'hover:bg-slate-400 active:bg-slate-500' : 'invisible'
        }`}
        onClick={handlePrevPage}
        disabled={!prev}
      >
        <svg className="w-[24px] h-[24px] stroke-[#121417]">
          <use href={`${sprite}#icon-arrow-left`} />
        </svg>
      </button>
      <ul className="flex gap-[2px]">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              className={`rounded-full w-7 h-7 pb-[1px] transition-colors ${
                number === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-300 hover:bg-slate-400 active:bg-slate-500'
              }`}
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
      <button
        className={`bg-slate-300 rounded-full w-7 h-7 flex items-center justify-center transition-colors ${
          next ? 'hover:bg-slate-400 active:bg-slate-500' : 'invisible'
        }`}
        onClick={handleNextPage}
        disabled={!next}
      >
        <svg className="w-[24px] h-[24px] stroke-[#121417]">
          <use href={`${sprite}#icon-arrow-right`} />
        </svg>
      </button>
    </div>
  );
};

export default CustomPagination;
