import { useState } from 'react';
import FormNote from './components/note/FormNote';
import DangerIcon from './components/ui/icons/DangerIcon';
import EyeIcon from './components/ui/icons/EyeIcon';
import TrashIcon from './components/ui/icons/TrashIcon';
import Modal from './components/ui/modal/Modal';
import useListNote from './hooks/useListNote';
import { deleteNoteService } from './services/note.service';
import { Note } from './types/note.type';
import { parseDateUtil } from './utils/date.util';

const App = () => {
  const { notes, isLoading, fetchNotes } = useListNote();

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [viewNote, setViewNote] = useState<Note | null>(null);
  const [removeNote, setRemoveNote] = useState<Note | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalViewNote, setOpenModalViewNote] = useState(false);
  const [openModelRemoveNote, setOpenModelRemoveNote] = useState(false);

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

  const handleDeleteNoteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: Note,
  ) => {
    e.stopPropagation();

    setRemoveNote(note);
    setOpenModelRemoveNote(true);
  };

  const handleConfirmDeleteNoteClick = async (note: Note) => {
    await updateNotes();
    await deleteNoteService(note.noteId!);
    setOpenModelRemoveNote(false);
  };

  const updateNotes = async () => {
    await fetchNotes();
  };

  return (
    <main className="grid place-items-center w-screen h-screen">
      <div>
        <h1 className="font-bold text-5xl mb-6">Notes</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl duration-500 hover:bg-green-700"
          onClick={handleAddNoteClick}
        >
          Add note
        </button>
        <section className="flex flex-col mt-8 w-[30rem] overflow-auto h-[24.3rem] scroll gap-3">
          {isLoading ? (
            <div className="w-full h-full grid place-items-center">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {notes.map((note) => (
                <article
                  key={note.noteId}
                  className={`group relative flex flex-col rounded-2xl bg-white p-6 cursor-pointer duration-300x gap-3 hover:bg-gray-200`}
                  style={{
                    backgroundColor: '#fbfbfb',
                  }}
                  onClick={() => handleNoteClick(note)}
                >
                  <div className="hidden absolute top-1 right-2 group-hover:flex items-center justify-center gap-1">
                    <button onClick={(e) => handleViewNoteClick(e, note)}>
                      <EyeIcon />
                    </button>
                    <button
                      onClick={(e) => handleDeleteNoteClick(e, note)}
                      className="text-red-600"
                    >
                      <TrashIcon size={19} />
                    </button>
                  </div>
                  <h6 className="font-bold text-lg">{note.title}</h6>
                  <p className="text-gray-500">{note.description}</p>
                  <p className="text-gray-500">
                    {parseDateUtil(new Date(note.createdAt!))}
                  </p>
                </article>
              ))}
            </>
          )}
        </section>
        {openModal && (
          <FormNote
            setOpenModal={setOpenModal}
            note={selectedNote}
            updateNotes={updateNotes}
          />
        )}
        {openModalViewNote && (
          <Modal setOpenModal={setOpenModalViewNote}>
            <h2 className="text-4xl font-semibold">{viewNote?.title}</h2>
            <div className="flex justify-between mt-2 text-gray-400">
              <p>{viewNote?.description}</p>
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <p>{parseDateUtil(new Date(viewNote!.createdAt!))}</p>
              <p>state: {viewNote?.noteState?.name}</p>
            </div>
          </Modal>
        )}
        {openModelRemoveNote && (
          <Modal setOpenModal={setOpenModelRemoveNote}>
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
        )}
      </div>
    </main>
  );
};

export default App;
