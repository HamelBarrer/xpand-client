import { useEffect, useState } from 'react';
import useListNote from '../../hooks/useListNote';
import {
  createNoteService,
  listNoteStateService,
  updateNoteService,
} from '../../services/note.service';
import { Note, NoteState } from '../../types/note.type';
import ErrorAlert from '../ui/alert/ErrorAlert';
import Modal from '../ui/modal/Modal';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  note?: Note | null;
}

const FormNote = ({ setOpenModal, note }: Props) => {
  const { fetchNotes } = useListNote();

  const [form, setForm] = useState({
    title: note?.title ?? '',
    description: note?.description ?? '',
    noteStateId: note?.noteStateId ?? 0,
  });
  const [noteStates, setNoteStates] = useState<NoteState[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const buttonName = note ? 'Update note' : 'Create note';

  const { title, description, noteStateId } = form;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (note) {
        setErrorMessage('');
        await updateNoteService(note.noteId!, {
          title,
          description,
          noteStateId,
        });
        await fetchNotes();
      } else {
        setErrorMessage('');
        await createNoteService({ title, description, noteStateId });
        await fetchNotes();
      }
    } catch (error) {
      const err = error as Error;
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listNoteStateService().then((res) => setNoteStates(res));
  }, []);

  return (
    <Modal setOpenModal={setOpenModal}>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Title
          <input
            type="text"
            className="shadow-md p-2 rounded-md cursor-pointer"
            placeholder="Example: Launch"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          Description:
          <input
            type="text"
            className="shadow-md p-2 rounded-md cursor-pointer"
            placeholder="Example: It's at 2 in the afternoon"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col">
          State:
          <select
            value={noteStateId}
            className="shadow-md p-2 rounded-md cursor-pointer"
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
        </label>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl duration-500 hover:bg-green-700">
          {loading ? (
            <div className="flex items-center justify-center gap-4">
              <div className="loader__input"></div>
              <p>Processing</p>
            </div>
          ) : (
            <>{buttonName}</>
          )}
        </button>
      </form>
    </Modal>
  );
};

export default FormNote;
