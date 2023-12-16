import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { deleteNote } from "../redux/features/notes/notesSlice";

// Component
import EditNote from "./EditNote";

// Material-UI
import { List } from "@mui/material";

// React icons
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

// CSS
import "../styles/NoteList.css";

const NoteList: React.FC = () => {

    const notes = useAppSelector(state => state.notesReducer.notes); // notes is an array

    const dispatch = useAppDispatch();

    // Local Storage for colors
    function getColorsFromLocalStorage() {
        let colorsFromLocalStorage = localStorage.getItem("noteColors");
        if (colorsFromLocalStorage) {
            return JSON.parse(colorsFromLocalStorage);
        }
        else {
            return '{}';
        }
    }

    const [noteColors, setNoteColors] = useState<{ [key: number]: string }>(getColorsFromLocalStorage());

    const handleColorChange = (noteId: number, color: string) => {

        if(noteColors === "{}") {
            setNoteColors(noteColors);
        }

        const updatedColors = {
            ...noteColors,
            [noteId]: color,
        };

        setNoteColors(updatedColors);
        localStorage.setItem("noteColors", JSON.stringify(updatedColors));
    }

    const [hoveredNote, setHoveredNote] = useState<number | null>(null);

    // Creating a state for modal
    const [modalShow, setModalShow] = useState(false);

    function editClickFunc(param) {
        setHoveredNote(param);
        setModalShow(true);
    }

    return (
        <>
            <List id="notes-container">
                {notes.map((eachNote, index) => {

                    const noteStyle: any = {
                        backgroundColor: noteColors[eachNote.id] || "#f8f8f8"
                    };

                    return (
                        <div key={index} style={{ ...noteStyle, boxShadow: hoveredNote === eachNote.id && "0 0 3px black" }} className="note"
                            onMouseEnter={() => setHoveredNote(eachNote.id)}>

                            <h2>{eachNote.title}</h2>
                            <p>{eachNote.content}</p>
                            <span>{eachNote.date}</span>

                            <MdEdit id="edit-icon" onClick={() => editClickFunc(eachNote.id)}
                                style={{
                                    visibility: hoveredNote === eachNote.id ? 'visible' : 'hidden'
                                }}
                            />

                            {hoveredNote === eachNote.id && <EditNote note={eachNote} show={modalShow} onHide={() => setModalShow(false)} />}

                            <div id="color-container" style={{ visibility: hoveredNote === eachNote.id ? 'visible' : 'hidden' }}>

                                <div
                                    className={`color-btn white ${noteColors === "{}" || noteStyle.backgroundColor === "#f8f8f8" || noteColors[eachNote.id] === "#f8f8f8" || !noteColors[eachNote.id] ? "active-color" : ""}`}
                                    onClick={() => handleColorChange(eachNote.id, "#f8f8f8")}>
                                </div>

                                <div
                                    className={`color-btn red ${noteColors[eachNote.id] === "#ffcdd2" ? "active-color" : ""}`}
                                    onClick={() => handleColorChange(eachNote.id, "#ffcdd2")}>
                                </div>

                                <div
                                    className={`color-btn yellow ${noteColors[eachNote.id] === "#f0f4c3" ? "active-color" : ""}`}
                                    onClick={() => handleColorChange(eachNote.id, "#f0f4c3")}>
                                </div>

                                <div
                                    className={`color-btn green ${noteColors[eachNote.id] === "#b3e6cc" ? "active-color" : ""}`}
                                    onClick={() => handleColorChange(eachNote.id, "#b3e6cc")}>
                                </div>

                                <div
                                    className={`color-btn blue ${noteColors[eachNote.id] === "#d9e3f0" ? "active-color" : ""}`}
                                    onClick={() => handleColorChange(eachNote.id, "#d9e3f0")}>
                                </div>

                            </div>

                            <FaTrashAlt style={{ visibility: hoveredNote === eachNote.id ? 'visible' : 'hidden' }}
                                id="delete-btn" onClick={() => dispatch(deleteNote(eachNote))} />
                        </div>
                    )
                })}
            </List>
        </>
    )
}

export default NoteList;
