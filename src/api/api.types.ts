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
