export interface Response {
  info: Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
}
