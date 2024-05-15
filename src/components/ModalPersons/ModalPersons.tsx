import Modal from 'react-modal';
import sprite from '../../assets/icons/sprite.svg';
import { FC, useEffect } from 'react';
import { Character } from '../../api/api.types';

interface ModalPersonsProps {
  person: Character;
  isOpen: boolean;
  onClose: () => void;
}

const ModalPersons: FC<ModalPersonsProps> = ({ person, isOpen, onClose }) => {
  const { name, status, image, species, location, gender } = person;

  useEffect(() => {
    Modal.setAppElement('#root');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: 'rgba(18, 20, 23, 0.5)',
          zIndex: 3,
        },
        content: {
          borderRadius: '24px',
          width: '520px',
          height: '620px',
          padding: '40px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <button
        className="absolute top-[16px] right-[16px] flex items-center justify-center bg-transparent"
        onClick={onClose}
      >
        <svg className="w-[24px] h-[24px] stroke-[#121417]">
          <use href={`${sprite}#icon-x-modal`} />
        </svg>
      </button>
      {isOpen && (
        <div className="flex flex-col items-center">
          <img
            className="h-[300px] object-cover rounded-full mb-4"
            src={image}
            alt="person"
          />
          <div className="flex flex-col">
            <div className="text-center mb-3">
              <h2 className="text-2xl font-bold">{name}</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline">
                <h3 className="text-xl font-semibold mr-1">Species:</h3>
                <p className="text-lg">{species}</p>
              </div>
              <div className="flex items-baseline">
                <h3 className="text-xl font-semibold mr-1">Status: </h3>
                <p className="text-lg">{status}</p>
              </div>
              <div className="flex items-baseline">
                <h3 className="text-xl font-semibold mr-1">Gender: </h3>
                <p className="text-lg">{gender}</p>
              </div>
              <div className="flex flex-wrap items-baseline">
                <h3 className="text-xl font-semibold mr-1">
                  Last known location:
                </h3>
                <p className="text-lg">{location.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalPersons;
