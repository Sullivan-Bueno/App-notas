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
    await axios.post("http://localhost:5000/addnotes", {
      title,
      description,
    });
    setTitle("");
    setDescription("");
  }

  return (
    <div className="text-black w-full h-full flex justify-center items-center">
      <form className="bg-amber-200 flex flex-col text-center p-4 gap-2 items-center">
        <label htmlFor="title" className="text-3xl">
          Título
        </label>
        <input
          type="text"
          id="title"
          className="bg-white rounded-md h-8 w-full text-center"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="description" className="text-3xl">
          Descrição
        </label>
        <textarea
          type="text"
          id="description"
          className="bg-white rounded-md h-50 w-200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button
          type="submit"
          className="bg-gray-100 p-2 cursor-pointer w-50 rounded-md hover:bg-gray-500 hover:text-white ease-in transition-all"
          onClick={handleSubmitClick}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default AddNote;
