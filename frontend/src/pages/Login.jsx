import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [, setCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLoginClick(email, password) {
    try {
      const token = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      });
      setCookie("token", token.data.token);
      navigate("/");
    } catch (err) {
      alert("Email ou senha inválidos");
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.4)]">
      <div className="flex justify-center itens-center h-150 w-150 bg-[rgba(0,0,0,0.6)] p-4 rounded-2xl">
        <div className="text-white flex flex-col justify-center">
          <label htmlFor="email" className="text-2xl">
            E-mail
          </label>
          <input
            value={email}
            onChange={handleEmailChange}
            type="text"
            className="bg-white h-10 w-80 text-black rounded-md p-2"
            placeholder="E-mail"
          />
          <label htmlFor="password" className="text-2xl">
            Password
          </label>
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            className="bg-white h-10 w-80 text-black rounded-md p-2"
            placeholder="Password"
          />
          <button
            onClick={() => {
              handleLoginClick(email, password);
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
