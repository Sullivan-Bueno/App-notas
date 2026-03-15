import { useEffect, useState } from "react";
import AllNotes from "./AllNotes.jsx";
import SingleNote from "./SingleNote.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [noteArray, setNoteArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.token == undefined) {
      navigate("/login");
    }
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
  }, [id, cookies.token, navigate]);

  if (type === "SingleNote") {
    return <SingleNote note={note} loading={loading} />;
  }
  return <AllNotes note={noteArray} loading={loading} />;
};

export default Home;
