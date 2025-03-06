import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import Home from "./pages/Home";


function App() {
  return (
    <div>
      <NotesProvider>
        <Router>
          <div >
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </NotesProvider>
    </div>
  );
}

export default App;
