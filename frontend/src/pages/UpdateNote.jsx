import { ArrowBigLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdateNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const date = new Date(note?.date).toLocaleDateString("pt-BR");

  useEffect(() => {
    async function getNote(id) {
      try {
        const data = await axios.get(`http://localhost:5000/note/${id}`);
        setNote(data.data[0]);
      } catch (err) {
        console.error(err);
      }
    }
    getNote(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (note?.description) setDescription(note.description);
    if (note?.title) setTitle(note.title);
  }, [note]);

  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleXClick() {
    navigate(`/${id}`);
  }

  async function handleSubmitClick() {
    await axios.put(`http://localhost:5000/note/${id}`, {
      title,
      description,
    });
    navigate(`/${id}`);
  }

  return (
    <div className="flex justify-center items-center h-full w-full bg-[rgba(0,0,0,0.4)] bg-blend-color">
      <ArrowBigLeft
        className="cursor-pointer bg-[rgba(0,0,0,0.4)] bg-blend-color text-white h-[48px] w-[48px] rounded-3xl absolute top-3 left-22 hover:bg-white hover:text-black ease-in transition-all"
        onClick={handleXClick}
      />
      <div className="flex flex-col gap-2 text-black h-150 w-250 bg-gray-800 p-6 rounded-3xl">
        <div className="flex justify-between items-center text-white">
          <p>{date}</p>
          <div className="flex gap-4 justify-center items-center"></div>
        </div>
        <textarea
          className="text-3xl font-semibold bg-white rounded-2xl p-1"
          value={title}
          onChange={onChangeTitle}
        ></textarea>
        <textarea
          className="text-2xl h-full bg-white rounded-2xl p-1"
          value={description}
          onChange={onChangeDescription}
        ></textarea>
        <button
          className="cursor-pointer p-2 border-white border-1 w-50 self-center text-white hover:bg-white hover:text-black transition-all ease-in rounded-2xl"
          onClick={handleSubmitClick}
        >
          Concluir alterações
        </button>
      </div>
    </div>
  );
};
export default UpdateNote;
