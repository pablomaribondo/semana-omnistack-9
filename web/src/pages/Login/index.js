import { useState } from "react";

import api from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async event => {
    event.preventDefault();

    const response = await api.post("/sessions", { email });

    const { _id } = response.data;

    localStorage.setItem("user", _id);
  };

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e econtre{" "}
        <strong>talentos</strong> para a sua empresa
      </p>

      <form onSubmit={submitHandler}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          id="email"
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />

        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
};

export default Login;
