import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import axios from "axios";

const Login = () => {
  const [, setCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await axios.post("http://localhost:5000/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });
      setCookie("token", token.data.token);
      navigate("/");
    } catch (err) {
      alert("Email ou senha inválidos");
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-full w-full flex-1 items-center justify-center bg-black/40 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-gray-900/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-md">
          <header className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25">
              <NotebookPen className="h-8 w-8" strokeWidth={1.75} aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Entrar
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-400">
              Use seu e-mail e senha para acessar suas notas.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
              placeholder="seu@email.com"
            >
              E-mail
            </Input>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
              placeholder="••••••••"
            >
              Senha
            </Input>
            <button
              type="submit"
              className="mt-1 h-11 w-full rounded-xl bg-amber-500 font-medium text-gray-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              Entrar
            </button>
          </form>
          <p className="text-gray-200 mt-6">
            Não possui uma conta? <Link to={"/signup"} className="font-medium text-amber-400 hover:text-amber-300">Crie uma conta aqui!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
