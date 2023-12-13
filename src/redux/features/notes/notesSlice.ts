import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Local Storage for notes
function getFromLocalStorage() {
    let notesFromLocalStorage = localStorage.getItem("notes");
    if (notesFromLocalStorage) {
        return JSON.parse(notesFromLocalStorage);
    }

    else {
        return []; // empty array
    }
}

function storeInLocalStorage(note: any) {
    localStorage.setItem("notes", JSON.stringify(note));
}

// Local Storage for uniqueID
function getIdFromLocalStorage() {
    let idFromLocalStorage = localStorage.getItem("uniqueID");
    if (idFromLocalStorage) {
        return JSON.parse(idFromLocalStorage);
    }

    else {
        return 1;
    }
}

function storeIdInLocalStorage(id: number) {
    localStorage.setItem("uniqueID", JSON.stringify(id));
}

export interface Note {
    id: number,
    title: string,
    content: string,
    date: string
}

interface NoteState {
    notes: Note[]
}

const initialState: NoteState = {
    notes: getFromLocalStorage()
}

// Global variable
let uniqueID: number = getIdFromLocalStorage();

// Creating a function that returns current date and time as a string
function getCurrentDateTime(): string {

    let day: number = new Date().getDate(); // (1-31)
    let month: number = new Date().getMonth() + 1; // (1-12)
    let year: number = new Date().getFullYear(); // (yyyy)
    let hour: number = new Date().getHours(); // (0-23)
    let minute: number = new Date().getMinutes(); // (0-59)

    // Sayı 10'dan küçük ise 0 ile başlasın. (Örneğin: 7:14 -> 07:14 ya da 5/7/2023 -> 05/07/2023)
    function startWithZero(value: number): string {
        return (value < 10 ? "0" + value : value.toString());
    }

    let formattedDay: string = startWithZero(day);
    let formattedMonth: string = startWithZero(month);
    let formattedHour: string = startWithZero(hour);
    let formattedMinute: string = startWithZero(minute);

    let getNoteDate: string = `${formattedDay}/${formattedMonth}/${year}, ${formattedHour}:${formattedMinute}`;

    return getNoteDate;
}

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {

        // Adding a new note
        addNote: (state, action: PayloadAction<{ title: string, content: string }>) => {

            state.notes.push({
                id: uniqueID,
                title: action.payload.title,
                content: action.payload.content,
                date: getCurrentDateTime()
            })

            uniqueID = uniqueID + 1;

            storeInLocalStorage(state.notes);
            storeIdInLocalStorage(uniqueID);
        },

        // Deleting the note with the given id
        deleteNote: (state, action: PayloadAction<{ id: number }>) => {

            state.notes = state.notes.filter(eachNote => eachNote.id !== action.payload.id);

            storeInLocalStorage(state.notes);
            storeIdInLocalStorage(uniqueID);
        },

        // Updating the note with the given id
        updateNote: (state, action: PayloadAction<{ id: number, title: string, content: string }>) => {

            // Finding the note with the given id
            const noteToUpdate = state.notes.find(note => note.id === action.payload.id);

            if (noteToUpdate) {

                // Title ya da Content'te bir değişiklik yok ise güncel tarihi yazdırma!
                if (noteToUpdate.title === action.payload.title && noteToUpdate.content === action.payload.content) { }
                else {
                    noteToUpdate.date = getCurrentDateTime() + " (updated)"
                }

                noteToUpdate.title = action.payload.title;
                noteToUpdate.content = action.payload.content;

                storeInLocalStorage(state.notes);
            }
        }
    }
})

export default notesSlice.reducer;
export const { addNote, deleteNote, updateNote } = notesSlice.actions;