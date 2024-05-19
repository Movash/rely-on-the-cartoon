import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FC, useState } from 'react';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import { SelectChangeEvent } from '@mui/material';

interface FilterProps {
  onFilterChange: (filters: any) => void;
  initialFilters: {
    name: string;
    species: string;
    status: string;
    gender: string;
  };
}

interface FilterState {
  name: string;
  species: string;
  status: string;
  gender: string;
}

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    marginTop: '-3px',
  },
  '& .MuiInputBase-root': {
    height: '48px',
  },
});

const Filter: FC<FilterProps> = ({ onFilterChange, initialFilters }) => {
  const [state, setState] = useState<FilterState>({
    name: initialFilters.name,
    species: initialFilters.species,
    status: initialFilters.status,
    gender: initialFilters.gender,
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

  const handleChange =
    (field: keyof FilterState) => (e: SelectChangeEvent<string>) => {
      setState(prevState => ({
        ...prevState,
        [field]: e.target.value as string,
      }));
    };

  const handleClick = () => {
    onFilterChange(state);
  };

  const handleClearFilters = () => {
    const clearedState = { name: '', species: '', status: '', gender: '' };
    setState(clearedState);
    onFilterChange(clearedState);
  };

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
          value={state.species}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange('species')}
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
          value={state.status}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange('status')}
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
          value={state.gender}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleChange('gender')}
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
