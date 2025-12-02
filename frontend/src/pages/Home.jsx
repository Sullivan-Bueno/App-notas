import { useEffect, useState } from "react";
import AllNotes from "../components/AllNotes.jsx";
import SingleNote from "../components/SingleNote.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = ({ type }) => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [noteArray, setNoteArray] = useState([]);

  useEffect(() => {
    async function getNote() {
      try {
        const url = id
          ? `http://localhost:5000/note/${id}`
          : `http://localhost:5000/note`;
        const res = await axios.get(url);
        if (id) {
          setNote(res.data[0]);
        } else {
          setNoteArray(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getNote();
  });

  if (type === "SingleNote") {
    return <SingleNote note={note} />;
  }
  return <AllNotes note={noteArray} />;
};

export default Home;
