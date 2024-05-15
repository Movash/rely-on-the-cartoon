import { Character } from '../../api/api.types';
import ModalPersons from '../../components/ModalPersons/ModalPersons';
import { FC, useState } from 'react';

interface PersonsListItemProps {
  person: Character;
}

const PersonsListItem: FC<PersonsListItemProps> = ({ person }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { name, status, image, species } = person;

  const openModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <li
        className="relative flex flex-col justify-between w-[266px] h-[426px] rounded-[14px] bg-[#ffe0b6] shadow-xl"
        onClick={openModalToggle}
      >
        <div className="flex flex-col justify-between items-center h-full">
          <img
            className="h-[300px] object-cover rounded-tl-[14px] rounded-tr-[14px]"
            src={image}
            alt="person"
          />
          <div className="flex flex-col justify-center items-center h-[126px] gap-2">
            <h2 className="font-bold text-xl text-[#121417] text-center">
              {name}
            </h2>
            <h2 className="font-medium text-lg text-[#121417] text-center">
              {status} - {species}
            </h2>
          </div>
        </div>
      </li>
      <ModalPersons
        key={name}
        person={person}
        isOpen={isModalOpen}
        onClose={openModalToggle}
      />
    </>
  );
};

export default PersonsListItem;
