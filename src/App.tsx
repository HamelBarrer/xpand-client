import { useEffect, useState } from 'react';
import FormNote from './components/note/FormNote';
import { listNoteService, readNoteService } from './services/note.service';
import { Note } from './types/note.type';
import { parseDateUtil } from './utils/date.util';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleAddNoteClick = () => {
    setOpenModal(true);
    setSelectedNote(null);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setOpenModal(true);
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
        <section className="flex flex-col mt-8 rounded-2xl overflow-auto shadow-md h-[24.8rem] scroll">
          {notes.map((note, index) => (
            <article
              key={note.noteId}
              className={`flex flex-col bg-white p-6 cursor-pointer duration-300x ${
                index !== notes.length - 1 ? 'border-b border-gray-300' : ''
              } hover:bg-gray-200`}
              style={{ marginBottom: '1px' }}
              onClick={() => handleNoteClick(note)}
            >
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
      </div>
    </main>
  );
};

export default App;
