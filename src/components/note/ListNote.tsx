import { Note } from '../../types/note.type';
import { parseDateUtil } from '../../utils/date.util';
import EyeIcon from '../ui/icons/EyeIcon';
import TrashIcon from '../ui/icons/TrashIcon';

interface Props {
  notes: Note[];
  handleNoteClick: (note: Note) => void;
  handleViewNoteClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: Note,
  ) => void;
  handleDeleteNoteClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    note: Note,
  ) => void;
}

const ListNote = ({
  notes,
  handleNoteClick,
  handleViewNoteClick,
  handleDeleteNoteClick,
}: Props) => {
  return (
    <>
      {notes.length === 0 ? (
        <div className="grid place-items-center">
          <p className="font-bold">Not notes</p>
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
    </>
  );
};

export default ListNote;
