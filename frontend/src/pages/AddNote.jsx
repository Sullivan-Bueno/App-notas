import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { FilePlus } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookie] = useCookies(["token"]);
  const token = cookie.token;

  if (token == undefined) {
    return <Navigate to="/login" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const t = title.trim();
    const d = description.trim();
    if (!t || !d) {
      alert("Preencha os campos!");
      return;
    }
    await axios.post(
      "http://localhost:5000/note",
      {
        title: t,
        description: d,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    setTitle("");
    setDescription("");
  }

  return (
    <div className="flex min-h-full w-full flex-1 items-center justify-center bg-black/40 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-white/10 bg-gray-900/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-md">
          <header className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25">
              <FilePlus className="h-8 w-8" strokeWidth={1.75} aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Nova nota
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">
              Dê um título e escreva o conteúdo. Você pode editar depois na lista
              de notas.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-left">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-200"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                className={`h-11 ${inputClass}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex.: Ideias para o projeto"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-200"
              >
                Descrição
              </label>
              <textarea
                id="description"
                rows={6}
                className={`min-h-[140px] resize-y py-3 ${inputClass}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escreva o que quiser lembrar..."
              />
            </div>
            <button
              type="submit"
              className="mt-1 h-11 w-full rounded-xl bg-amber-500 font-medium text-gray-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Salvar nota
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
