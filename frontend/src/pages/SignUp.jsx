import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Check } from "lucide-react";
import Input from "../components/Input";
import axios from "axios";

const perks = [
  "Notas sincronizadas na sua conta",
  "Acesso seguro com e-mail e senha",
  "Interface pensada para foco",
];

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      alert("Use uma senha com pelo menos 6 caracteres.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/user/", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.err
        "Não foi possível criar a conta. Tente outro e-mail.";
      alert(msg);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-full w-full flex-1 bg-black/40">
      <div className="flex w-full flex-col lg:min-h-full lg:flex-row">
        <aside className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 bg-linear-to-br from-slate-900 via-gray-900 to-amber-950/40 px-8 py-10 lg:w-[42%] lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.15), transparent 45%),
                radial-gradient(circle at 80% 60%, rgba(255, 255, 255, 0.06), transparent 40%)`,
            }}
          />
          <div className="relative">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300 ring-1 ring-white/15">
              <UserPlus className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">
              Crie sua conta no NotasApp
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
              Em poucos passos você organiza ideias, listas e lembretes em um só
              lugar.
            </p>
          </div>
          <ul className="relative mt-10 space-y-3 lg:mt-0">
            {perks.map((text) => (
              <li
                key={text}
                className="flex items-start gap-3 text-sm text-gray-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <p className="relative mt-10 text-xs text-gray-500 lg:mt-14">
            Já tem conta?
            <Link
              to="/login"
              className="font-medium text-amber-400/90 underline-offset-2 hover:text-amber-300 hover:underline"
            >
              Entrar
            </Link>
          </p>
        </aside>

        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:py-14">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-gray-900/75 p-8 shadow-2xl shadow-black/50 backdrop-blur-md lg:p-9">
              <header className="mb-8 lg:hidden">
                <h2 className="text-xl font-semibold text-white">Cadastro</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Preencha os campos para começar.
                </p>
              </header>
              <header className="mb-8 hidden lg:block">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Dados da conta
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Usamos apenas o necessário para identificar você com
                  segurança.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Input
                  id="signup-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Como podemos te chamar?"
                >
                  Nome
                </Input>
                <Input
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
                  placeholder="seu@email.com"
                >
                  E-mail
                </Input>
                <Input
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
                  placeholder="Mínimo 6 caracteres"
                >
                  Senha
                </Input>
                <Input
                  id="signup-confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/95 px-4 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/25"
                  placeholder="Repita a senha"
                >
                  Confirmar Senha
                </Input>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 h-11 w-full rounded-xl bg-amber-500 font-medium text-gray-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitting ? "Criando conta…" : "Criar conta"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500 lg:hidden">
                Já tem conta?
                <Link
                  to="/login"
                  className="font-medium text-amber-400 hover:text-amber-300"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
