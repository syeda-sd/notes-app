import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import FullNote from "./components/FullNote";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState("save");
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedTrash = JSON.parse(localStorage.getItem("trash")) || [];
    setNotes(savedNotes);
    setTrash(savedTrash);
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trash", JSON.stringify(trash));
  }, [notes, trash, loaded]);

  const addNote = (note) => setNotes([note, ...notes]);

  const deleteNote = (id) => {
    const deleted = notes.find((n) => n.id === id);
    if (deleted) {
      setTrash([deleted, ...trash]);
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const restoreNote = (id) => {
    const restored = trash.find((t) => t.id === id);
    if (restored) {
      setNotes([restored, ...notes]);
      setTrash(trash.filter((t) => t.id !== id));
    }
  };

  const permanentDelete = (id) => {
    setTrash(trash.filter((t) => t.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Router basename="/notes-app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Header />

              {/* Save / Trash buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  marginBottom: "15px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setPage("save")}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: page === "save" ? "#ff8c72" : "#ffc1a6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Save Notes
                </button>

                <button
                  onClick={() => setPage("trash")}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: page === "trash" ? "#ff8c72" : "#ffc1a6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Trash
                </button>
              </div>

              {page === "save" ? (
                <>
                  <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                  />
                  <AddNote addNote={addNote} />
                  <NotesList
                    notes={filteredNotes}
                    deleteNote={deleteNote}
                  />
                </>
              ) : (
                <>
                  <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                    Trash
                  </h2>

                  {trash.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No deleted notes</p>
                  ) : (
                    trash.map((t) => (
                      <div key={t.id} className="note-card">
                        <h3>{t.title}</h3>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <button onClick={() => restoreNote(t.id)}>
                            Restore
                          </button>
                          <button onClick={() => permanentDelete(t.id)}>
                            Delete Permanently
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          }
        />
        <Route path="/note/:id" element={<FullNote notes={notes} />} />
      </Routes>
    </Router>
  );
}

export default App;
