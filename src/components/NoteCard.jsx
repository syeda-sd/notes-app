import { useState } from "react";
import { Link } from "react-router-dom";
import EditNote from "./EditNote";

function NoteCard({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);

  const shortText = note.text.length > 100 ? note.text.slice(0, 100) + "..." : note.text;

  return (
    <div className="note-card">
      {isEditing ? (
        <EditNote
          note={note}
          updateNote={updateNote}
          cancelEdit={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{shortText}</p>
          <small>{note.date}</small>
          <div className="buttons">
            <Link to={`/note/${note.id}`}>
              <button>Read More</button>
            </Link>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteCard;
