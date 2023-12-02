import { useEffect, useState } from 'react';
import {
  createNoteService,
  listNoteStateService,
  updateNoteService,
} from '../../services/note.service';
import { Note, NoteState } from '../../types/note.type';
import Modal from '../ui/modal/Modal';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  note?: Note | null;
}

const FormNote = ({ setOpenModal, note }: Props) => {
  const [form, setForm] = useState({
    title: note?.title ?? '',
    description: note?.description ?? '',
    noteStateId: note?.noteStateId ?? 0,
  });
  const [noteStates, setNoteStates] = useState<NoteState[]>([]);

  const { title, description, noteStateId } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (note) {
      await updateNoteService(note.noteId!, {
        title,
        description,
        noteStateId,
      });
    } else {
      await createNoteService({ title, description, noteStateId });
    }
  };

  useEffect(() => {
    listNoteStateService().then((res) => setNoteStates(res));
  }, []);

  return (
    <Modal setOpenModal={setOpenModal}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Title
          <input
            type="text"
            className="bg-gray-400 p-2 rounded-md"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Description
          <input
            type="text"
            className="bg-gray-400 p-2 rounded-md"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </label>
        <select
          value={noteStateId}
          onChange={(e) =>
            setForm({ ...form, noteStateId: Number(e.target.value) })
          }
        >
          {noteStates.map((state) => (
            <option value={state.noteStateId} key={state.noteStateId}>
              {state.name}
            </option>
          ))}
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl duration-500 hover:bg-green-700">
          {note ? 'Update note' : 'Create note'}
        </button>
      </form>
    </Modal>
  );
};

export default FormNote;
