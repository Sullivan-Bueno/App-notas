import "./App.css";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home type="allNotes" />} />
          <Route path="/:id" element={<Home type="SingleNote" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
