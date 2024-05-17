import { FC } from 'react';

interface PaginationProps {
  personsPerPage: number;
  totalPersons: number;
  paginate: (pageNumber: number) => void;
}

const CustomPagination: FC<PaginationProps> = ({
  personsPerPage,
  totalPersons,
  paginate,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPersons / personsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <a href="!#" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomPagination;
