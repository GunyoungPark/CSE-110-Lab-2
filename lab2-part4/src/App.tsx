import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module
import './hooksExercise.tsx';


function App() {
  return (
    <div className='app-container'>
      
      <form className="note-form">
        <div><input placeholder="Note Title"></input></div>
 
        <div id="noteTextArea"><textarea></textarea></div>

        <select name="selectLabel" id="selectLabel">
            <option value="">--Select your label--
           </option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Other">Other</option>
        </select>

        <div><button type="submit">Create Note</button></div>
      </form>
 
 <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div
            key={note.id}
            className="note-item">
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
    </div>
 
  );
 }


export default App;