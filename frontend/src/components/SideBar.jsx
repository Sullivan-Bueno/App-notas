import { House, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const iconBtnBase =
  "inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50";

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const homeActive = pathname === "/";
  const addActive = pathname === "/addnotes";

  return (
    <aside
      className="flex h-full w-21 shrink-0 flex-col items-center justify-center gap-4 border-r border-white/10 bg-gray-900/80 py-6 backdrop-blur-md rounded-r-3xl shadow-xl shadow-black/30"
      aria-label="Navegação principal"
    >
      <button
        type="button"
        aria-label="Todas as notas"
        aria-current={homeActive ? "page" : undefined}
        onClick={() => navigate("/")}
        className={`${iconBtnBase} ${
          homeActive
            ? "border-amber-500/45 bg-amber-500/15 text-amber-400 shadow-inner shadow-amber-900/20"
            : "border-white/10 bg-white/5 text-gray-200 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
        }`}
      >
        <House className="h-6 w-6" strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Nova nota"
        aria-current={addActive ? "page" : undefined}
        onClick={() => navigate("/addnotes")}
        className={`${iconBtnBase} ${
          addActive
            ? "border-amber-500/45 bg-amber-500/15 text-amber-400 shadow-inner shadow-amber-900/20"
            : "border-white/10 bg-white/5 text-gray-200 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 hover:rotate-90"
        }`}
      >
        <Plus className="h-6 w-6" strokeWidth={1.75} aria-hidden />
      </button>
    </aside>
  );
};

export default SideBar;
