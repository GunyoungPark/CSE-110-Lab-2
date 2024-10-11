import React, { useState } from 'react';
import './App.css';
//import { Label, Note } from "./types"; // Import the Label type from the appropriate module
//import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import './hooksExercise.tsx';

interface Stickynote {
  id: number;
  title: string;
  content: string;
  label: string;
  isFavorite: boolean;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Stickynote[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [label, setLabel] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  const toggleFavorite = (id: number) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  const handleEditNote = (id: number) => {
    setEditingNoteId(id);
  };

  const handleCreateNote = () => {
    if (!title || !content || !label) return; // Basic validation
    const newNote: Stickynote = {
      id: Date.now(),
      title,
      content,
      label,
      isFavorite: false,
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
    setLabel('');
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleSaveNote = (id: number, newTitle: string, newContent: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    ));
    setEditingNoteId(null); // Exit edit mode
  };

  return (
    <div className="app-container">
      <div className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select value={label} onChange={(e) => setLabel(e.target.value)}>
          <option value="">--Select your label--</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="other">Other</option>
        </select>
        <button onClick={handleCreateNote}>Submit</button>
      </div>


      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-item">
            {editingNoteId === note.id ? (
              <>
                <input
                  type="text"
                  defaultValue={note.title}
                  onChange={(e) => note.title = e.target.value}
                />
                <textarea
                  defaultValue={note.content}
                  onChange={(e) => note.content = e.target.value}
                />
                <button onClick={() => handleSaveNote(note.id, note.title, note.content)}>Save</button>
                <button onClick={() => setEditingNoteId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="note-header">
                  <h3>{note.title}</h3>
                  <button
                    className={`favorite-heart ${note.isFavorite ? 'liked' : ''}`}
                    onClick={() => toggleFavorite(note.id)}
                  >
                    &#x2764;
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>x</button>
                </div>
                <p>{note.content}</p>
                <small>{note.label}</small>
                <button id="editButton" onClick={() => handleEditNote(note.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
