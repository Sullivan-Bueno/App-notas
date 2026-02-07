import { X, Trash2, PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate"
import axios from "axios";

const SingleNote = ({ note, loading }) => {
  const navigate = useNavigate();

  function handleXClick() {
    navigate("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
        <div className="p-10 rounded-4xl bg-[rgba(0,0,0,0.6)]">
          <h1 className="text-white text-3xl ">Carregando...</h1>
        </div>
      </div>
    );
  }

  async function handleDeleteClick(id) {
    try {
      axios.delete(`http://localhost:5000/note/${id}`).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleEditClick(id) {
    navigate(`/updatenote/${id}`);
  }

  const dataFormatada = formatDate(note.date);
  return (
    <div className="flex justify-center items-center h-full w-full bg-[rgba(0,0,0,0.4)] bg-blend-color">
      <X
        className="cursor-pointer bg-[rgba(0,0,0,0.4)] bg-blend-color text-white h-[48px] w-[48px] rounded-3xl absolute top-3 left-22 hover:bg-white hover:text-black ease-in transition-all"
        onClick={handleXClick}
      />
      <div className="flex flex-col gap-2 text-black h-90 w-200 bg-amber-200 p-6 rounded-md">
        <div className="flex justify-between items-center">
          <p>{dataFormatada}</p>
          <div className="flex gap-4 justify-center items-center">
            <PencilLine
              className="bg-gray-100 rounded-md text-b h-10 w-10 p-1 cursor-pointer border-2 border-transparent
            ease-in transition-all  hover:border-black"
              onClick={() => {
                handleEditClick(note._id);
              }}
            />
            <Trash2
              className="bg-amber-100 rounded-md text-red-300 h-10 w-10 p-1 cursor-pointer border-2 border-transparent
            ease-in transition-all  hover:border-red-300 "
              onClick={() => {
                handleDeleteClick(note._id);
              }}
            />
          </div>
        </div>
        <h1 className="text-3xl font-semibold">{note.title}</h1>
        <p className="text-2xl">{note.description}</p>
      </div>
    </div>
  );
};

export default SingleNote;
