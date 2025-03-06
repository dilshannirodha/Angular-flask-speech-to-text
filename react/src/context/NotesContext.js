import React, { createContext, useState } from "react";

// Create Context
export const NotesContext = createContext();

// Provider Component
export const NotesProvider = ({ children }) => {
const [note, setNote] = useState("");


  return (
    <NotesContext.Provider value={{
         note, setNote
         
         }}>
      {children}
    </NotesContext.Provider>
  );
};

