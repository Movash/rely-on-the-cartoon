import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { getCharacters } from 'api/TheRickAndMorty.api';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import toast from 'react-hot-toast';

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    marginTop: '-3px',
  },
  '& .MuiInputBase-root': {
    height: '48px',
  },
});

const Filter = ({ setPersons, setIsLoading }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const allSpecies = [
    'human',
    'alien',
    'humanoid',
    'mythological creature',
    'disease',
    'robot',
    'unknown',
  ];
  const allStatuses = ['alive', 'dead', 'unknown'];
  const allGenders = ['male', 'female', 'genderless', 'unknown'];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSpeciesChange = e => {
    const currentSpecies = e.target.value;
    setSpecies(currentSpecies);
  };

  const handleStatusChange = e => {
    const currentStatus = e.target.value;
    setStatus(currentStatus);
  };

  const handleGenderChange = e => {
    const currentGender = e.target.value;
    setGender(currentGender);
  };

  const handleClearFilters = () => {
    setName('');
    setSpecies('');
    setStatus('');
    setGender('');
    setShouldFetch(true);
  };

  const handleClick = async () => {
    try {
      const data = await getCharacters({
        name,
        species,
        status,
        gender,
      });
      setPersons(data.results);
    } catch ({ message }) {
      toast.error('No results found.');
      console.log(message);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
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
      setShouldFetch(false);
    }
  }, [setIsLoading, setPersons, shouldFetch]);

  return (
    <section className="mb-[50px] flex justify-center items-center space-x-4">
      <StyledTextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        sx={{ width: '224px' }}
      />
      <FormControl className="w-56 h-12">
        <Select
          value={species}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleSpeciesChange}
          IconComponent={KeyboardArrowDownIcon}
          className="h-12"
        >
          <MenuItem value="">All species</MenuItem>
          {allSpecies.map((item, index) => (
            <MenuItem key={index} value={item}>
              {capitalizeFirstLetter(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-56 h-12">
        <Select
          value={status}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleStatusChange}
          IconComponent={KeyboardArrowDownIcon}
          className="h-12"
        >
          <MenuItem value="">All statuses</MenuItem>
          {allStatuses.map((item, index) => (
            <MenuItem key={index} value={item}>
              {capitalizeFirstLetter(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="w-56 h-12">
        <Select
          value={gender}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleGenderChange}
          IconComponent={KeyboardArrowDownIcon}
          className="h-12"
        >
          <MenuItem value="">All genders</MenuItem>
          {allGenders.map((item, index) => (
            <MenuItem key={index} value={item}>
              {capitalizeFirstLetter(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="flex gap-4">
        <button
          onClick={handleClick}
          className="h-12 w-48 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleClearFilters}
          className="h-12 w-24 bg-red-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-red-700"
        >
          Clear Filters
        </button>
      </div>
    </section>
  );
};

export default Filter;
