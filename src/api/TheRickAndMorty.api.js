import axios from 'axios';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

export async function getCharacters({
  name = '',
  species = '',
  status = '',
  gender = '',
} = {}) {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (species) params.append('species', species);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);

  const { data } = await axios.get(`/character?${params.toString()}`);
  return data;
}
