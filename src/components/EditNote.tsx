import React, { useState, useEffect } from 'react';
import { updateNote } from "../redux/features/notes/notesSlice";

// Material-UI
import { useAppDispatch } from '../redux/app/store';

// React Bootstrap
import Modal from 'react-bootstrap/Modal';

// CSS
import "../styles/EditNote.css";

interface EditNoteProps {
    note: any,
    show: boolean,
    onHide: () => void
}

const EditNote: React.FC<EditNoteProps> = (props: any) => {

    const dispatch = useAppDispatch();

    const [updatedTitle, setUpdatedTitle] = useState<string>(props.note.title);
    const [updatedContent, setUpdatedContent] = useState<string>(props.note.content);

    // Setting the limits
    const titleCharacterLimit = 20;
    const contentCharacterLimit = 70;

    function updateTitleFunc(e: any) {
        if (titleCharacterLimit - e.target.value.length >= 0) {
            setUpdatedTitle(e.target.value);
        }
    }

    function updateContentFunc(e: any) {
        if (contentCharacterLimit - e.target.value.length >= 0) {
            setUpdatedContent(e.target.value);
        }
    }

    function updateButtonClick() {
        if (updatedTitle && updatedContent) {
            dispatch(updateNote({
                id: props.note.id,
                title: updatedTitle,
                content: updatedContent
            }));

            // Close the modal 
            props.onHide();
        }
    }

    // Değişiklik yapıp "Cancel" ya da "X" butonuna tıklanırsa,
    // tekrar modal açıldığında değişikliği gösterme.
    useEffect(() => {
        if (!props.show) {
            setUpdatedTitle(props.note.title);
            setUpdatedContent(props.note.content);
        }
    }, [props.show, props.note]);

    return (

        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered >

            <Modal.Body>
                <input
                    autoComplete="off"
                    className="input-field modal-area"
                    placeholder="Title"
                    spellCheck="false"
                    value={updatedTitle}
                    onChange={updateTitleFunc}
                />

                <small className="modal-small">{updatedTitle.length + " / " + titleCharacterLimit}</small>

                <div id="empty-div"></div>

                <textarea
                    autoComplete="off"
                    className="input-field modal-area"
                    placeholder="Take a note..."
                    spellCheck="false"
                    value={updatedContent}
                    onChange={updateContentFunc}
                    rows={3}
                />

                <small className="modal-small">{updatedContent.length + " / " + contentCharacterLimit}</small>
            </Modal.Body>

            <Modal.Footer>
                <button id="cancel-btn" className='modal-btn' onClick={props.onHide}>Cancel</button>
                <button id="save-btn" className='modal-btn' onClick={() => updateButtonClick()}>Save</button>
            </Modal.Footer>

        </Modal>
    )
}

export default EditNote;