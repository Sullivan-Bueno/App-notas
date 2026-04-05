import { useNavigate } from "react-router-dom";
import { Search, FileText, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";

const AllNotes = ({ note, loading }) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const filteredNotes = note.filter((n) =>
    n.title.toLowerCase().includes(filter.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex min-h-full w-full flex-1 justify-center bg-black/40 px-4 py-8">
        <div className="w-full max-w-6xl">
          <div className="mb-6 h-14 w-full animate-pulse rounded-2xl bg-white/10" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/10 bg-gray-900/80 p-5 shadow-xl shadow-black/40"
              >
                <div className="mb-4 h-3 w-24 rounded bg-white/10" />
                <div className="mb-3 h-7 w-4/5 rounded bg-white/10" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-11/12 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full w-full flex-1 justify-center bg-black/40 px-4 py-8">
      <section className="w-full max-w-6xl">
        <div className="mb-6 rounded-2xl border border-white/10 bg-gray-900/80 p-3 shadow-xl shadow-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
            <Search className="h-5 w-5 shrink-0 text-gray-400" aria-hidden />
            <input
              placeholder="Buscar por titulo"
              type="text"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-gray-500 h-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            {filter ? (
              <button
                type="button"
                onClick={() => setFilter("")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>
          <p className="px-1 pt-3 text-sm text-gray-400">
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1 ? "nota" : "notas"} encontrada
            {filteredNotes.length === 1 ? "" : "s"}
          </p>
        </div>

        {note.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-gray-900/80 p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25">
              <FileText className="h-8 w-8" strokeWidth={1.75} aria-hidden />
            </div>
            <h1 className="text-xl font-semibold text-white">
              Nenhuma anotacao ainda
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Clique no botao de adicionar para criar sua primeira nota.
            </p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-gray-900/80 p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-md">
            <h1 className="text-xl font-semibold text-white">
              Nenhum resultado para sua busca
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Tente outro titulo ou limpe o filtro para ver todas as notas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((n) => {
              const dataFormatada = n.date ? formatDate(n.date) : "—";
              return (
                <article
                  key={n._id}
                  className="group cursor-pointer rounded-2xl border border-white/10 bg-gray-900/80 p-5 shadow-xl shadow-black/40 transition hover:-translate-y-1 hover:border-amber-500/35 hover:bg-gray-900/90"
                  onClick={() => navigate(`/${n._id}`)}
                >
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                    {dataFormatada}
                  </p>
                  <h2 className="mb-3 line-clamp-2 text-xl font-semibold text-white transition group-hover:text-amber-300">
                    {n.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-gray-300">
                    {n.description}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllNotes;
