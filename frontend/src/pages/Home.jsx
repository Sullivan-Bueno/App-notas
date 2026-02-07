import { useEffect, useState } from "react";
import AllNotes from "./AllNotes.jsx";
import SingleNote from "./SingleNote.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = ({ type }) => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [noteArray, setNoteArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getNote() {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
    getNote();
  }, [id]);

  if (type === "SingleNote") {
    return <SingleNote note={note} loading={loading} />;
  }
  return <AllNotes note={noteArray} loading={loading} />;
};

export default Home;
