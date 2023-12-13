import React, { useState } from "react";
import { useAppDispatch } from "../redux/app/store";
import { addNote } from "../redux/features/notes/notesSlice";

// Material-UI
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import PlusIcon from '@mui/icons-material/Add';

// CSS
import "../styles/NoteForm.css";

const NoteForm: React.FC = () => {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    // Setting the limits
    const titleCharacterLimit = 20;
    const contentCharacterLimit = 70;

    function titleChangeFunc(e: any) {
        if (titleCharacterLimit - e.target.value.length >= 0) {
            setTitle(e.target.value);
        }
    }

    function contentChangeFunc(e: any) {
        if (contentCharacterLimit - e.target.value.length >= 0) {
            setContent(e.target.value);
        }
    }

    function addButtonClick(e: any) {
        // Whenever you click on a button inside a form, the default behavior is to refresh the page.
        e.preventDefault();

        if (title && content) {
            dispatch(addNote({ title, content }))
            setTitle("");
            setContent("");
        }
    }

    function expandFunc() {
        setIsExpanded(true);
    }

    return (
        <>
            <form autoComplete="off">
                <TextField
                    onClick={expandFunc}
                    className="input-field"
                    id="standard-basic"
                    placeholder={isExpanded ? "Title" : "Type to add a note..."}
                    variant="standard"
                    spellCheck="false"
                    value={title}
                    onChange={titleChangeFunc}
                />

                {isExpanded && <small>{title.length + " / " + titleCharacterLimit}</small>}

                <div id="empty-div"></div>

                {isExpanded &&
                    <TextField
                        className="input-field"
                        id="standard-textarea"
                        label="Take a note..."
                        variant="standard"
                        multiline
                        spellCheck="false"
                        value={content}
                        onChange={contentChangeFunc}
                    />}

                {isExpanded && <small>{content.length + " / " + contentCharacterLimit}</small>}

                <Zoom in={isExpanded}>
                    <Fab id="add-btn" onClick={addButtonClick}>
                        <PlusIcon id="plus-icon" />
                    </Fab>
                </Zoom>
            </form>
        </>
    )
}

export default NoteForm;