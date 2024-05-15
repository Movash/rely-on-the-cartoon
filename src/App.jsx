import { getCharacters } from 'api/TheRickAndMorty.api';
import Filter from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import PersonsList from 'components/PersonsList/PersonsList';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [persons, setPersons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacters();
        if (!data.results.length) {
          toast.error('Something went wrong.');
          return;
        }
        setPersons(data.results);
      } catch ({ message }) {
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
