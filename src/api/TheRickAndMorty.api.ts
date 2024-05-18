import axios, { AxiosResponse } from 'axios';
import { Response } from './api.types';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

interface GetCharactersParams {
  name?: string;
  species?: string;
  status?: string;
  gender?: string;
  page?: number;
}

export async function getCharacters({
  name = '',
  species = '',
  status = '',
  gender = '',
  page = 1,
}: GetCharactersParams = {}): Promise<AxiosResponse<Response>> {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (species) params.append('species', species);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);
  params.append('page', page.toString());

  const response = await axios.get(`/character?${params.toString()}`);
  return response;
}
