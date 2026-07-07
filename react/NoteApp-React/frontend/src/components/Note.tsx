import "../styles/Note.css"

interface NoteType {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: number;
}

interface NoteProps {
  note: NoteType;
  onDelete: (id: string | number) => void; // A function that takes an id and returns nothing
}

function Note({ note, onDelete }: NoteProps) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
