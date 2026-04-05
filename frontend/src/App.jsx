import "./App.css";
import SideBar from "./components/SideBar.jsx";
import Home from "./pages/Home.jsx";
import AddNote from "./pages/AddNote.jsx";
import UpdateNote from "./pages/UpdateNote.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-full w-full flex">
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home type="allNotes" />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<Home type="SingleNote" />} />
          <Route path="/addnotes" element={<AddNote />} />
          <Route path="/updatenote/:id" element={<UpdateNote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
