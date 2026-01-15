import NoteCard from "./NoteCard";
import { motion, AnimatePresence } from "framer-motion";

function NotesList({ notes, deleteNote, updateNote }) {
  return (
    <AnimatePresence>
      {notes.map((note) => (
        <motion.div
          key={note.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          layout
        >
          <NoteCard note={note} deleteNote={deleteNote} updateNote={updateNote} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default NotesList;
