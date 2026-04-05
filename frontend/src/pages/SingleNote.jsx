import { ArrowLeft, Trash2, PencilLine, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import axios from "axios";

const toolbarIconBtn =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-200 transition hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50";

const SingleNote = ({ note, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-full w-full flex-1 items-center justify-center bg-black/40 px-4 py-8">
        <div className="w-full max-w-2xl animate-pulse rounded-3xl border border-white/10 bg-gray-900/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="mb-6 h-4 w-32 rounded-lg bg-white/10" />
          <div className="mb-4 h-9 w-4/5 max-w-md rounded-lg bg-white/10" />
          <div className="space-y-3 pt-2">
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-11/12 rounded bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (!note?._id) {
    return (
      <div className="flex min-h-full w-full flex-1 items-center justify-center bg-black/40 px-4 py-8">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-900/80 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25">
            <FileText className="h-8 w-8" strokeWidth={1.75} aria-hidden />
          </div>
          <h1 className="text-xl font-semibold text-white">Nota não encontrada</h1>
          <p className="mt-2 text-sm text-gray-400">
            Ela pode ter sido removida ou o link está incorreto.
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

  async function handleDeleteClick(id) {
    try {
      await axios.delete(`http://localhost:5000/note/${id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  const dataFormatada = note.date ? formatDate(note.date) : "—";

  return (
    <div className="flex min-h-full w-full flex-1 justify-center bg-black/40 px-4 py-8">
      <div className="flex w-full max-w-2xl flex-col">
        <article className="flex min-h-0 flex-1 flex-col rounded-3xl border border-white/10 bg-gray-900/80 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-gray-200 transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
              Voltar
            </button>
            <span className="hidden h-6 w-px bg-white/15 sm:block" aria-hidden />
            <time
              dateTime={note.date ? new Date(note.date).toISOString() : undefined}
              className="text-sm text-gray-400"
            >
              {dataFormatada}
            </time>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className={toolbarIconBtn}
                aria-label="Editar nota"
                onClick={() => navigate(`/updatenote/${note._id}`)}
              >
                <PencilLine className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                className={`${toolbarIconBtn} hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300 focus-visible:ring-red-400/40`}
                aria-label="Excluir nota"
                onClick={() => handleDeleteClick(note._id)}
              >
                <Trash2 className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
            <header className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25">
                  <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Nota
                </span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {note.title}
              </h1>
            </header>
            <div className="border-t border-white/10 pt-6">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-300 sm:text-lg">
                {note.description}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SingleNote;
