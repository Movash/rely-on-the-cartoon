import { AxiosResponse } from 'axios';
import { getCharacters } from './api/TheRickAndMorty.api';
import { Character } from './api/api.types';
import Filter from './components/Filter/Filter';
import Loader from './components/Loader/Loader';
import PersonsList from './components/PersonsList/PersonsList';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [persons, setPersons] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse<{ results: Character[] }> =
          await getCharacters();
        const data = response.data.results;
        if (!data.length) {
          toast.error('Something went wrong.');
          return;
        }
        setPersons(data);
      } catch (error) {
        toast.error('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div className="w-[1440px] mx-auto my-[50px] px-[15px]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Filter setPersons={setPersons} setIsLoading={setIsLoading} />
          <PersonsList persons={persons} />
        </>
      )}
      <Toaster />
    </div>
  );
};
