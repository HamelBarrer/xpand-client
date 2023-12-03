import { Note } from '../../types/note.type';
import DangerIcon from '../ui/icons/DangerIcon';
import Modal from '../ui/modal/Modal';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  removeNote: Note | null;
  handleConfirmDeleteNoteClick: (note: Note) => Promise<void>;
}

const RemoveNote = ({
  setOpenModal,
  removeNote,
  handleConfirmDeleteNoteClick,
}: Props) => {
  return (
    <Modal setOpenModal={setOpenModal}>
      <div className="grid place-items-center">
        <div className="w-44 h-44 text-red-600 drop-shadow-[0_0_.1rem_red]">
          <DangerIcon />
        </div>
        <p>
          He is about to delete the note{' '}
          <span className="font-bold">{removeNote?.title}</span>
        </p>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded-lg"
          onClick={() => handleConfirmDeleteNoteClick(removeNote!)}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default RemoveNote;
