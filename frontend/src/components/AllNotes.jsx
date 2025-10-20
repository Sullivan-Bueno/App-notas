import Note from "./Note";
import { useNavigate } from "react-router-dom";

const AllNotes = ({ note }) => {
  const navigate = useNavigate();

  if (note.length === 0) {
    return (
      <div className="h-full w-full flex justify-center items-center ">
        <div className="bg-[rgba(0,0,0,0.5)] p-10 rounded-4xl">
          <h1 className="text-white text-3xl ">Carregando...</h1>
        </div>
      </div>
    );
  }

  function handleNoteClick(id) {
    navigate(`/${id}`);
  }

  return (
    <div className="h-full w-full bg-[rgba(0,0,0,0.4)]">
      <div className="grid grid-cols-3 gap-5">
        {note.map((n) => {
          return (
            <div
              key={n._id}
              className=" bg-amber-200 m-3 rounded-2xl p-2 shadow-2xl hover:scale-102 cursor-pointer transition-all ease-in min-w-145 min-h-35"
              onClick={() => {
                handleNoteClick(n._id);
              }}
            >
              <Note note={n} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllNotes;
