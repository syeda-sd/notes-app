import { useParams, useNavigate } from "react-router-dom";

function FullNote({ notes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((n) => n.id === Number(id));

  if (!note) return <p>Note not found</p>;

  return (
    <div className="app full-note">
      <h2>{note.title}</h2>
      <p>{note.text}</p>
      <small>{note.date}</small>
      <button className="back-btn" onClick={() => navigate(-1)}>
  ⬅ Back to Notes
</button>

    </div>
  );
}

export default FullNote;
