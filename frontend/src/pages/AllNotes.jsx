import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useState } from "react";
import MessageComponent from "../components/MessageComponent";

const AllNotes = ({ note, loading }) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const filteredNotes = note.filter((n) =>
    n.title.toLowerCase().includes(filter.toLowerCase()),
  );

  if (loading) {
    return <MessageComponent>Carregando...</MessageComponent>;
  }

  if (note.length == 0) {
    return <MessageComponent>Notas não encontradas</MessageComponent>;
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleNoteClick(id) {
    navigate(`/${id}`);
  }

  return (
    <div className="h-full w-full bg-[rgba(0,0,0,0.4)] flex flex-col items-center py-2">
      <div className="bg-white/50 w-160 h-15 rounded-3xl flex justify-between items-center p-2 gap-2">
        <input
          placeholder="Search for Title"
          type="text"
          className="h-full w-full text-2xl outline-none"
          value={filter}
          onChange={handleFilterChange}
        />
        <button className="cursor-pointer hover:text-white">
          <Search />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {filteredNotes.map((n) => {
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
