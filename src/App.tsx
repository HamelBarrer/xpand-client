import { useState } from 'react';
import FormNote from './components/note/FormNote';
import ListNote from './components/note/ListNote';
import RemoveNote from './components/note/RemoveNote';
import ViewNote from './components/note/ViewNote';
import useListNote from './hooks/useListNote';
import { deleteNoteService } from './services/note.service';
import { Note } from './types/note.type';

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
    await deleteNoteService(note.noteId!);
    await updateNotes();
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
            <ListNote
              notes={notes}
              handleNoteClick={handleNoteClick}
              handleViewNoteClick={handleViewNoteClick}
              handleDeleteNoteClick={handleDeleteNoteClick}
            />
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
          <ViewNote setOpenModal={setOpenModalViewNote} viewNote={viewNote} />
        )}
        {openModelRemoveNote && (
          <RemoveNote
            setOpenModal={setOpenModelRemoveNote}
            removeNote={removeNote}
            handleConfirmDeleteNoteClick={handleConfirmDeleteNoteClick}
          />
        )}
      </div>
    </main>
  );
};

export default App;
