import { useState } from "react";

function AddNote({ addNote }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submit = () => {
    if (!text) return;

    addNote({
      id: Date.now(),
      title,
      text,
      date: new Date().toLocaleDateString(),
    });

    setTitle("");
    setText("");
  };

  return (
    <div className="add-note">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="4"
        placeholder="Write your note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button onClick={submit}>Add Note</button>
    </div>
  );
}

export default AddNote;
