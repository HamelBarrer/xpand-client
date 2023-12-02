export interface NoteState {
  noteStateId: number;
  name: string;
}

export interface Note {
  noteId?: number;
  title: string;
  description: string;
  noteStateId?: number;
  noteState?: NoteState;
  createdAt?: Date;
}
