import PersonsListItem from 'components/PersonsListItem/PersonsListItem';

const PersonsList = ({ persons }) => {
  return (
    <ul className="flex flex-wrap gap-x-[20px] gap-y-[50px]">
      {persons.map(person => (
        <PersonsListItem person={person} key={person.id} />
      ))}
    </ul>
  );
};

export default PersonsList;