import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  notes: localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [],
};

export const notebaseSlice = createSlice({
  name: "notebase",
  initialState,
  reducers: {
    add: (state, action) => {
      const note = action.payload;
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Note Created !");
    },
    update: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex((item) => item._id === note._id);
      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
    reset: (state) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },
    remove: (state, action) => {
      const noteid = action.payload;
      console.log(noteid);
      const index = state.notes.findIndex((item) => item._id === noteid);
      if (index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
      toast.success("Note Removed !");
    },
  },
});

export const { add, update, reset, remove } = notebaseSlice.actions;

export default notebaseSlice.reducer;
