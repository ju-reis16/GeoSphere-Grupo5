import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/dashboard");

        console.log("Resposta da API:", response.data);

        // Funciona tanto se vier { user: {...} }
        // quanto se vier diretamente {...}
        setUser(response.data.user || response.data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [navigate]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Dashboard</h1>

      {user ? (
        <>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Perfil:</strong> {user.role}
          </p>

          <button
            onClick={logout}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}