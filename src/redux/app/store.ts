import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Slice
import notesSlice from "../features/notes/notesSlice";

export const store = configureStore({
    reducer: {
        notesReducer: notesSlice // Diğer sayfalarda "notesReducer" olarak kullanacağız.
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;