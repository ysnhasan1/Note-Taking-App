import React from 'react';
import { useAppSelector } from './redux/app/store';

// Components
import Header from './components/Header';
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import ZeroNote from './components/ZeroNote';

// React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// CSS
import "./styles/App.css";

const App: React.FC = () => {

  const lengthOfNotesArray = useAppSelector(state => state.notesReducer.notes).length;

  return (
    <>
      <Header />
      <NoteForm />
      {lengthOfNotesArray === 0 ? <ZeroNote /> : <NoteList />}
    </>
  )
}

export default App;