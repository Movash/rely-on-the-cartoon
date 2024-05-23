import { ChangeEvent, FC, useState } from 'react';
import sprite from '../../assets/icons/sprite.svg';

interface FilterState {
  name: string;
  species: string;
  status: string;
  gender: string;
  sortOrder: string;
}

interface FilterProps {
  onFilterChange: (filters: any) => void;
  initialFilters: FilterState;
}

const Filter: FC<FilterProps> = ({ onFilterChange, initialFilters }) => {
  const [state, setState] = useState<FilterState>({
    name: initialFilters.name,
    species: initialFilters.species,
    status: initialFilters.status,
    gender: initialFilters.gender,
    sortOrder: initialFilters.sortOrder,
  });
  const [openSelect, setOpenSelect] = useState<string | null>(null);

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
  const sortOptions = ['ascending', 'descending'];

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChange =
    (field: keyof FilterState) =>
    (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setState(prevState => ({
        ...prevState,
        [field]: e.target.value as string,
      }));
    };

  const handleClick = () => {
    onFilterChange(state);
  };

  const handleClearFilters = () => {
    const clearedState = {
      name: '',
      species: '',
      status: '',
      gender: '',
      sortOrder: '',
    };
    setState(clearedState);
    onFilterChange(clearedState);
  };

  const handleSelectClick = (selectName: string) => {
    setOpenSelect(prevOpenSelect =>
      prevOpenSelect === selectName ? null : selectName
    );
  };

  const renderSelect = (
    label: string,
    value: string,
    options: string[],
    option: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    selectName: string
  ) => (
    <div className="w-56">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          onClick={() => handleSelectClick(selectName)}
          onBlur={() => setOpenSelect(null)}
          className="h-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 cursor-pointer"
          style={{ paddingRight: '28px' }}
        >
          <option value="">{option}</option>
          {options.map((item, index) => (
            <option key={index} value={item}>
              {capitalizeFirstLetter(item)}
            </option>
          ))}
        </select>
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 transition-transform ${
            openSelect === selectName ? 'transform rotate-180' : ''
          }`}
        >
          <svg className="w-[12px] h-[12px] stroke-[#121417]">
            <use href={`${sprite}#icon-arrow-bottom`} />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <section className="mb-[50px] flex justify-center items-end space-x-4">
      <div className="w-56">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter name"
          value={state.name}
          onChange={handleChange('name')}
          className="h-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 cursor-pointer"
        />
      </div>
      {renderSelect(
        'Species',
        state.species,
        allSpecies,
        'All species',
        handleChange('species'),
        'species'
      )}
      {renderSelect(
        'Status',
        state.status,
        allStatuses,
        'All statuses',
        handleChange('status'),
        'status'
      )}
      {renderSelect(
        'Gender',
        state.gender,
        allGenders,
        'All genders',
        handleChange('gender'),
        'gender'
      )}
      {renderSelect(
        'Sort Order',
        state.sortOrder,
        sortOptions,
        'Sort by name',
        handleChange('sortOrder'),
        'sortOrder'
      )}
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
          Clear
        </button>
      </div>
    </section>
  );
};

export default Filter;
