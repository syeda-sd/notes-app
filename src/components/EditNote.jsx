import { useState } from "react";

function EditNote({ note, updateNote, cancelEdit }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const handleUpdate = () => {
    if (!text) return;
    updateNote({ ...note, title, text });
    cancelEdit();
  };

  return (
    <div className="add-note">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={handleUpdate}>Save</button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    </div>
  );
}

export default EditNote;
