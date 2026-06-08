import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response =
          await api.get("/dashboard");

        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

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
    return <h2>Carregando...</h2>;
  }

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>Dashboard</h1>

      <p>
        Email:
        {" "}
        {user?.email}
      </p>

      <p>
        Perfil:
        {" "}
        {user?.role}
      </p>

      <button onClick={logout}>
        Sair
      </button>
    </div>
  );
}