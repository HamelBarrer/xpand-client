import { ENDPOINTS } from '../constants/api.constant';
import { fetchBasic } from '../http/fetch';
import { Note, NoteState } from '../types/note.type';

export const listNoteStateService = async () => {
  try {
    const response = await fetchBasic(ENDPOINTS.NOTE_STATE);
    const dataJson = await response.json();

    return dataJson as NoteState[];
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const readNoteService = async (noteId: number) => {
  try {
    const response = await fetchBasic(`${ENDPOINTS.NOTE}/${noteId}`);
    const dataJson = await response.json();

    return dataJson as Note;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const listNoteService = async () => {
  try {
    const response = await fetchBasic(ENDPOINTS.NOTE);
    const dataJson = await response.json();

    return dataJson as Note[];
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const createNoteService = async (note: Note) => {
  try {
    const response = await fetchBasic(ENDPOINTS.NOTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    const dataJson = await response.json();
    if (!response.ok) {
      throw new Error(dataJson.message);
    }

    return dataJson as Note;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const updateNoteService = async (noteId: number, note: Note) => {
  try {
    const response = await fetchBasic(`${ENDPOINTS.NOTE}/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    const dataJson = await response.json();
    if (!response.ok) {
      throw new Error(dataJson.message);
    }

    return dataJson as Note;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const deleteNoteService = async (noteId: number) => {
  try {
    const response = await fetchBasic(`${ENDPOINTS.NOTE}/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataJson = await response.json();

    return dataJson as Note;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};
