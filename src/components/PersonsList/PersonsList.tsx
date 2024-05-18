import { FC } from 'react';
import { Character } from '../../api/api.types';
import PersonsListItem from '../../components/PersonsListItem/PersonsListItem';

interface PersonsListProps {
  persons: Character[];
}

const PersonsList: FC<PersonsListProps> = ({ persons }) => {
  return (
    <section className="mb-[50px]">
      <ul className="flex flex-wrap gap-x-[20px] gap-y-[50px]">
        {persons.map(person => (
          <PersonsListItem person={person} key={person.id} />
        ))}
      </ul>
    </section>
  );
};

export default PersonsList;
