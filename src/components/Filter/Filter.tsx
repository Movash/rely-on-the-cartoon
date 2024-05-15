import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FC, Dispatch, useEffect, useState, SetStateAction } from 'react';
import { getCharacters } from '../../api/TheRickAndMorty.api';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import toast from 'react-hot-toast';
import { Character } from '../../api/api.types';
import { SelectChangeEvent } from '@mui/material';

interface FilterState {
  name: string;
  species: string;
  status: string;
  gender: string;
  shouldFetch: boolean;
}

type ChangeHandler = (e: SelectChangeEvent<{ value: unknown }>) => void;
type ClearFiltersHandler = () => void;

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    marginTop: '-3px',
  },
  '& .MuiInputBase-root': {
    height: '48px',
  },
});

const Filter: FC<{
  setPersons: Dispatch<SetStateAction<Character[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}> = ({ setPersons, setIsLoading }) => {
  const [state, setState] = useState<FilterState>({
    name: '',
    species: '',
    status: '',
    gender: '',
    shouldFetch: false,
  });

  const allSpecies = [
    'human',
    'alien',
    'humanoid',
    'animal',
    'mythological creature',
    'disease',
    'robot',
    'cronenberg',
    'poopybutthole',
    'unknown',
  ];
  const allStatuses = ['alive', 'dead', 'unknown'];
  const allGenders = ['male', 'female', 'genderless', 'unknown'];

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSpeciesChange: ChangeHandler = e => {
    const currentSpecies = e.target.value as string;
    setState(prevState => ({ ...prevState, species: currentSpecies }));
  };

  const handleStatusChange: ChangeHandler = e => {
    const currentStatus = e.target.value as string;
    setState(prevState => ({ ...prevState, status: currentStatus }));
  };

  const handleGenderChange: ChangeHandler = e => {
    const currentGender = e.target.value as string;
    setState(prevState => ({ ...prevState, gender: currentGender }));
  };

  const handleClearFilters: ClearFiltersHandler = () => {
    setState({
      name: '',
      species: '',
      status: '',
      gender: '',
      shouldFetch: true,
    });
  };

  const handleClick = async () => {
    try {
      const response = await getCharacters({
        name: state.name,
        species: state.species,
        status: state.status,
        gender: state.gender,
      });
      const data = response.data.results;
      setPersons(data);
    } catch (error) {
      toast.error('No results found.');
    }
  };

  useEffect(() => {
    if (state.shouldFetch) {
      const fetchCharacters = async () => {
        try {
          setIsLoading(true);
          const response = await getCharacters();
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
      setState(prevState => ({ ...prevState, shouldFetch: false }));
    }
  }, [state, setPersons, setIsLoading]);

  return (
    <section className="mb-[50px] flex justify-center items-center space-x-4">
      <StyledTextField
        label="Name"
        value={state.name}
        onChange={e =>
          setState(prevState => ({ ...prevState, name: e.target.value }))
        }
        sx={{ width: '224px' }}
      />
      <FormControl className="w-56 h-12">
        <Select
          // @ts-ignore
          value={state.species}
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
          // @ts-ignore
          value={state.status}
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
          // @ts-ignore
          value={state.gender}
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
