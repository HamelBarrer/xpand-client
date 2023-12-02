import { useEffect, useState } from 'react';
import FormNote from './components/note/FormNote';
import EyeIcon from './components/ui/icons/EyeIcon';
import TrashIcon from './components/ui/icons/TrashIcon';
import Modal from './components/ui/modal/Modal';
import { listNoteService, readNoteService } from './services/note.service';
import { Note } from './types/note.type';
import { parseDateUtil } from './utils/date.util';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [viewNote, setViewNote] = useState<Note | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalViewNote, setOpenModalViewNote] = useState(false);

  const handleAddNoteClick = () => {
    setOpenModal(true);
    setSelectedNote(null);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setOpenModal(true);
  };

  const handleViewNoteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: Note,
  ) => {
    e.stopPropagation();

    setViewNote(note);
    setOpenModalViewNote(true);
  };

  useEffect(() => {
    readNoteService(2).then((res) => console.log({ res }));
    listNoteService().then((res) => setNotes(res));
  }, []);

  return (
    <main className="grid place-items-center w-screen h-screen">
      <div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl duration-500 hover:bg-green-700"
          onClick={handleAddNoteClick}
        >
          Add note
        </button>
        <section className="flex flex-col mt-8 w-[30rem] rounded-2xl overflow-auto shadow-md h-[24.8rem] scroll">
          {notes.map((note, index) => (
            <article
              key={note.noteId}
              className={`relative flex flex-col bg-white p-6 cursor-pointer duration-300x gap-3 h-24 ${
                index !== notes.length - 1 ? 'border-b border-gray-300' : ''
              } hover:bg-gray-200`}
              style={{ marginBottom: '1px' }}
              onClick={() => handleNoteClick(note)}
            >
              <div className="absolute top-1 right-2 flex items-center justify-center gap-1">
                <button onClick={(e) => handleViewNoteClick(e, note)}>
                  <EyeIcon />
                </button>
                <button className="text-red-600">
                  <TrashIcon size={19} />
                </button>
              </div>
              <div className="flex justify-between">
                <h6>{note.title}</h6>
                <p>{parseDateUtil(new Date(note.createdAt!))}</p>
              </div>
              <p>{note.description}</p>
            </article>
          ))}
        </section>
        {openModal && (
          <FormNote setOpenModal={setOpenModal} note={selectedNote} />
        )}
        {openModalViewNote && (
          <Modal setOpenModal={setOpenModalViewNote}>
            <div className="flex items-center justify-between">
              <h2 className="text-4xl">{viewNote?.title}</h2>
              <p>{parseDateUtil(new Date(viewNote!.createdAt!))}</p>
            </div>
            <div className="flex justify-between">
              <p>{viewNote?.description}</p>
              <p>state: {viewNote?.noteState?.name}</p>
            </div>
          </Modal>
        )}
      </div>
    </main>
  );
};

export default App;
