import bgImage from "../assets/img.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaGithub,
} from "react-icons/fa";

import api from "../services/api";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //Envio do formulário
  const [error, setError] = useState("");         // Mensagem de erro vinda da API

  // Envia as credenciais para a API e salva no token se for sucesso
  async function handleLogin(e) {
    e.preventDefault(); // Evita o recarregamento padrão do formulário

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/login", {
        email,
        password,
      });

      const { token, usuario } = response.data;

      //token e os dados do usuário para uso posterior (ex: exibir nome, verificar permissões)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      // Redireciona para a página principal após login 
      navigate("/home");

    } catch (err) {
      // Exibe a mensagem da API ou um erro
      setError(
        err.response?.data?.message ||
        "Erro ao realizar login"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Decoração de fundo */}
      <div className="background-overlay"></div>
      <div className="background-blur one"></div>
      <div className="background-blur two"></div>

      <div className="glass-card">

        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to continue</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Exibe a mensagem de erro apenas quando houver falha no login */}
          {error && (
            <span className="error">{error}</span>
          )}

          {/* Botão desabilitado durante o envio */}
          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Login"}
          </button>

        </form>

        <div className="divider">
          <span>ou continue com</span>
        </div>
        
        <div className="social-login">
          <button type="button"><FaGoogle /></button>
          <button type="button"><FaFacebookF /></button>
          <button type="button"><FaGithub /></button>
        </div>

      </div>
    </div>
  );
}