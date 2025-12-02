import axios from "axios";
import { useState } from "react";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  async function handleSubmitClick(e) {
    e.preventDefault();
    if (title == false || description == false) {
      alert("Preencha os campos!");
    } else {
      await axios.post("http://localhost:5000/note", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
    }
  }

  return (
    <div className="text-black w-full h-full flex justify-center items-center bg-blend-color bg-[rgba(0,0,0,0.4)]">
      <form className="bg-gray-800 flex flex-col text-center p-4 gap-2 items-center rounded-2xl">
        <label htmlFor="title" className="text-3xl text-white">
          Título
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-100 rounded-md h-8 w-full text-center"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="description" className="text-3xl text-white">
          Descrição
        </label>
        <textarea
          type="text"
          id="description"
          className="bg-gray-100 rounded-md h-50 w-200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button
          type="submit"
          className=" text-white border-2 border-transparent p-2 cursor-pointer w-50 rounded-md hover:border-amber-500 hover:text-amber-500 ease-in transition-all"
          onClick={handleSubmitClick}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AddNote;
