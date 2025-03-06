import React, { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";  // Adjust the path if necessary

const UserInput = () => {
  const { note, setNote } = useContext(NotesContext); // Access context
  const [inputValue, setInputValue] = useState(note); // Store user input temporarily in local state

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle form submission or any action to save the note
  const handleSubmit = () => {
    setNote(inputValue);  // Update context with user input
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your note"
      />
      <button onClick={handleSubmit}>Save Note</button>
    </div>
  );
};

export default UserInput;
