import { ENDPOINTS } from '../constants/api.constant';
import { fetchBasic } from '../http/fetch';
import { Note, NoteState } from '../types/note.type';

export const listNoteStateService = async () => {
  const response = await fetchBasic(ENDPOINTS.NOTE_STATE);
  const dataJson = await response.json();

  return dataJson as NoteState[];
};

export const readNoteService = async (noteId: number) => {
  const response = await fetchBasic(`${ENDPOINTS.NOTE}/${noteId}`);
  const dataJson = await response.json();

  return dataJson as Note;
};

export const listNoteService = async () => {
  const response = await fetchBasic(ENDPOINTS.NOTE);
  const dataJson = await response.json();

  return dataJson as Note[];
};

export const createNoteService = async (note: Note) => {
  const response = await fetchBasic(ENDPOINTS.NOTE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const dataJson = await response.json();

  return dataJson as Note;
};

export const updateNoteService = async (noteId: number, note: Note) => {
  const response = await fetchBasic(`${ENDPOINTS.NOTE}/${noteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const dataJson = await response.json();

  return dataJson as Note;
};
