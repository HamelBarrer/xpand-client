import { Note } from '../../types/note.type';
import { parseDateUtil } from '../../utils/date.util';
import Modal from '../ui/modal/Modal';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewNote: Note | null;
}

const ViewNote = ({ setOpenModal, viewNote }: Props) => {
  return (
    <Modal setOpenModal={setOpenModal}>
      <h2 className="text-4xl font-semibold">{viewNote?.title}</h2>
      <div className="flex justify-between mt-2 text-gray-400">
        <p>{viewNote?.description}</p>
      </div>
      <div className="flex items-center justify-between text-gray-400">
        <p>{parseDateUtil(new Date(viewNote!.createdAt!))}</p>
        <p>state: {viewNote?.noteState?.name}</p>
      </div>
    </Modal>
  );
};

export default ViewNote;
