import React, { useContext, useState } from "react";
import UserInput from "../components/UserInput";
import { NotesContext } from "../context/NotesContext";
import Speech from "../components/Speech";

const Home = () => {
    const {note} = useContext(NotesContext);
 


  return (
   <div>
    <Speech />
   </div>
  )
};

export default Home;
