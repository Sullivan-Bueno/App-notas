import { ArrowLeft, PencilLine, FileText } from "lucide-react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { formatDate } from "../utils/formatDate";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25";

const UpdateNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    if (!token) return;
    let cancelled = false;
    async function getNote() {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/note/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (!cancelled) setNote(data[0] ?? null);
      } catch (err) {
        console.error(err);
        if (!cancelled) setNote(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    getNote();
    return () => {
      cancelled = true;
    };
  }, [id, token]);

  useEffect(() => {
    if (!note) return;
    setDescription(note.description ?? "");
    setTitle(note.title ?? "");
  }, [note]);

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
    await axios.put(`http://localhost:5000/note/${id}`, {
      title: t,
      description: d,
    });
    navigate(`/${id}`);
  }

  if (loading) {
    return (
      <div className="flex min-h-full w-full flex-1 items-center justify-center bg-black/40 px-4 py-10">
        <div className="w-full max-w-lg animate-pulse rounded-3xl border border-white/10 bg-gray-900/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-white/10" />
          <div className="mb-4 h-8 w-48 rounded-lg bg-white/10" />
          <div className="mb-6 h-4 w-32 rounded bg-white/10" />
          <div className="mb-4 h-11 w-full rounded-xl bg-white/10" />
          <div className="h-32 w-full rounded-xl bg-white/10" />
        </div>
      </div>
    );
  }

  if (!note?._id) {
    return (
      <div className="flex min-h-full w-full flex-1 items-center justify-center bg-black/40 px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-900/80 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25">
            <FileText className="h-8 w-8" strokeWidth={1.75} aria-hidden />
          </div>
          <h1 className="text-xl font-semibold text-white">Nota não encontrada</h1>
          <p className="mt-2 text-sm text-gray-400">
            Não foi possível carregar esta nota para edição.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 font-medium text-gray-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            Voltar às notas
          </button>
        </div>
      </div>
    );
  }

  const dataFormatada = note.date ? formatDate(note.date) : "—";

  return (
    <div className="flex min-h-full w-full flex-1 items-center justify-center bg-black/40 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-white/10 bg-gray-900/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
            <button
              type="button"
              onClick={() => navigate(`/${id}`)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-gray-200 transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
              Voltar
            </button>
            <span className="text-sm text-gray-400">{dataFormatada}</span>
          </div>

          <header className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25">
              <PencilLine className="h-8 w-8" strokeWidth={1.75} aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Editar nota
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-400">
              Atualize o título e o texto. As alterações substituem o conteúdo
              atual.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-left">
              <label
                htmlFor="edit-title"
                className="text-sm font-medium text-gray-200"
              >
                Título
              </label>
              <input
                id="edit-title"
                type="text"
                className={`h-11 ${inputClass}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da nota"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label
                htmlFor="edit-description"
                className="text-sm font-medium text-gray-200"
              >
                Descrição
              </label>
              <textarea
                id="edit-description"
                rows={6}
                className={`min-h-[140px] resize-y py-3 ${inputClass}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conteúdo da nota..."
              />
            </div>
            <button
              type="submit"
              className="mt-1 h-11 w-full rounded-xl bg-amber-500 font-medium text-gray-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Salvar alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
