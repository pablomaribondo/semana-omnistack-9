import { useState } from "react";
import "./App.css";

import api from "./services/api";
import logo from "./assets/logo.svg";

const App = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async event => {
    event.preventDefault();

    const response = await api.post("/sessions", { email });

    const { _id } = response.data;

    localStorage.setItem("user", _id);
  };

  return (
    <div className="container">
      <img src={logo} alt="AirCnC" />

      <div className="content">
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
      </div>
    </div>
  );
};

export default App;
