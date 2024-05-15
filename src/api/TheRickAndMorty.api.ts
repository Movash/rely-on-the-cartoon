import axios, { AxiosResponse } from 'axios';
import { Character } from './api.types';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

interface GetCharactersParams {
  name?: string;
  species?: string;
  status?: string;
  gender?: string;
}

export async function getCharacters({
  name = '',
  species = '',
  status = '',
  gender = '',
}: GetCharactersParams = {}): Promise<AxiosResponse<{ results: Character[] }>> {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (species) params.append('species', species);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);

  const response = await axios.get(`/character?${params.toString()}`);
  return response;
}
