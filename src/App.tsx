import { getCharacters } from './api/TheRickAndMorty.api';
import { Character } from './api/api.types';
import Filter from './components/Filter/Filter';
import Loader from './components/Loader/Loader';
import PersonsList from './components/PersonsList/PersonsList';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CustomPagination from './components/CustomPagination/CustomPagination';
import { useSearchParams } from 'react-router-dom';

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export const App = () => {
  const [persons, setPersons] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  const pageParam = searchParams.get('page');
  const nameParam = searchParams.get('name') || '';
  const speciesParam = searchParams.get('species') || '';
  const statusParam = searchParams.get('status') || '';
  const genderParam = searchParams.get('gender') || '';

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const response = await getCharacters({
          page: currentPage,
          name: nameParam,
          species: speciesParam,
          status: statusParam,
          gender: genderParam,
        });
        const { info, results } = response.data;
        if (!results.length) {
          toast.error('Something went wrong.');
          return;
        }
        setPersons(results);
        setPaginationInfo(info);
      } catch (error) {
        toast.error('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [currentPage, genderParam, nameParam, speciesParam, statusParam]);

  const paginate = (pageNumber: number) => {
    const params = Object.fromEntries(searchParams);
    params.page = pageNumber.toString();
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });
    setSearchParams(params);
  };

  const handleFilterChange = (filters: any) => {
    const params = { ...filters, page: '1' };
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });
    setSearchParams(params);
  };

  return (
    <div className="w-[1440px] mx-auto my-[50px] px-[15px]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Filter
            onFilterChange={handleFilterChange}
            initialFilters={{
              name: nameParam,
              species: speciesParam,
              status: statusParam,
              gender: genderParam,
            }}
          />
          <PersonsList persons={persons} />
          {paginationInfo.pages > 1 && (
            <CustomPagination
              paginationInfo={paginationInfo}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </>
      )}
      <Toaster />
    </div>
  );
};
