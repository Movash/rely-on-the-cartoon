import { getCharacters } from './api/TheRickAndMorty.api';
import { Character } from './api/api.types';
import Filter from './components/Filter/Filter';
import Loader from './components/Loader/Loader';
import PersonsList from './components/PersonsList/PersonsList';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CustomPagination from './components/CustomPagination/CustomPagination';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export const App = () => {
  const [filteredPersons, setFilteredPersons] = useState<Character[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const nameParam = searchParams.get('name') || '';
  const speciesParam = searchParams.get('species') || '';
  const statusParam = searchParams.get('status') || '';
  const genderParam = searchParams.get('gender') || '';
  const sortOrderParam = searchParams.get('sortOrder') || '';

  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const personsPerPage = 20;

  const { data, isLoading, isError } = useQuery(
    ['characters', currentPage],
    async () => {
      const allCharacters: Character[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await getCharacters({ page });
        const { info, results } = response.data;
        allCharacters.push(...results);
        hasMore = !!info.next;
        page += 1;
      }

      return allCharacters;
    },
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (data) {
      let filtered = [...data];

      if (nameParam) {
        filtered = filtered.filter(person =>
          person.name.toLowerCase().includes(nameParam.toLowerCase())
        );
      }

      if (speciesParam) {
        filtered = filtered.filter(person =>
          person.species.toLowerCase().includes(speciesParam.toLowerCase())
        );
      }

      if (statusParam) {
        filtered = filtered.filter(
          person => person.status.toLowerCase() === statusParam.toLowerCase()
        );
      }

      if (genderParam) {
        filtered = filtered.filter(
          person => person.gender.toLowerCase() === genderParam.toLowerCase()
        );
      }

      if (sortOrderParam) {
        if (sortOrderParam === 'ascending') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrderParam === 'descending') {
          filtered.sort((a, b) => b.name.localeCompare(a.name));
        }
      }

      setFilteredPersons(filtered);
    }
  }, [nameParam, speciesParam, statusParam, genderParam, sortOrderParam, data]);

  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = filteredPersons.slice(
    indexOfFirstPerson,
    indexOfLastPerson
  );

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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error('Something went wrong.');
    return <div>Something went wrong</div>;
  }

  return (
    <div className="w-[1440px] mx-auto my-[50px] px-[15px]">
      <Filter
        onFilterChange={handleFilterChange}
        initialFilters={{
          name: nameParam,
          species: speciesParam,
          status: statusParam,
          gender: genderParam,
          sortOrder: sortOrderParam,
        }}
      />
      <PersonsList persons={currentPersons} />
      {filteredPersons.length > personsPerPage && (
        <CustomPagination
          paginationInfo={{
            count: filteredPersons.length,
            pages: Math.ceil(filteredPersons.length / personsPerPage),
            next:
              currentPage < Math.ceil(filteredPersons.length / personsPerPage)
                ? (currentPage + 1).toString()
                : null,
            prev: currentPage > 1 ? (currentPage - 1).toString() : null,
          }}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
      <Toaster />
    </div>
  );
};
