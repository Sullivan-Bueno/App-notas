import { useEffect, useState } from "react";
import Notes from "../components/Notes.jsx";
import SingleNote from "../components/SingleNote.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = ({ type }) => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [noteArray, setNoteArray] = useState([])

  useEffect(() => {
    async function getNote() {
      try {
        const url = id
          ? `http://localhost:5000/${id}`
          : `http://localhost:5000/`;
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
  }, [id]);

  if (type === "SingleNote") {
    return <SingleNote note={note} />;
  }
  return <Notes note={noteArray} />
};

export default Home;
