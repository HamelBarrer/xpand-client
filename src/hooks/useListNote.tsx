import { useEffect, useState } from 'react';
import { listNoteService } from '../services/note.service';
import { Note } from '../types/note.type';

const useListNote = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const result = await listNoteService();
      setNotes(result);
    } catch (error) {
      const err = error as Error;
      setIsError(true);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, error, isLoading, isError, fetchNotes };
};

export default useListNote;
