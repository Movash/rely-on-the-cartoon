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
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const response = await getCharacters({ page: currentPage });
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
  }, [currentPage]);

  const paginate = async (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
    try {
      setIsLoading(true);
      const response = await getCharacters({ page: pageNumber });
      const { info, results } = response.data;
      setPersons(results);
      setPaginationInfo(info);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[1440px] mx-auto my-[50px] px-[15px]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Filter
            setPersons={setPersons}
            setPaginationInfo={setPaginationInfo}
            setIsLoading={setIsLoading}
            setSearchParams={setSearchParams}
          />
          <PersonsList persons={persons} />
          <CustomPagination
            paginationInfo={paginationInfo}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
      <Toaster />
    </div>
  );
};
