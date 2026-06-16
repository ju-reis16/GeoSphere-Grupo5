import "./App.css";
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet } from "react-router-dom";

// Home
import Home from "./pages/home/home";
import QuestaoDetalhe from "./pages/questoes/questoes";
import Autores from "./pages/autores/autores";
import SobreNos from "./pages/sobre-nós/sobre_nos";
import Flashcards from "./pages/flashcards/flashcards";

// Banco de Questões
import BancoQuestoes from "./pages/questoes/BancoQuestoes";

// Login
import Login from "./pages/login";
import PrivateRoute from "./routes/privateRoute";

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="logo">
          <h1>GeoSphere</h1>
          <p>Geografia para vestibulares</p>
        </div>

        <nav>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "ativo" : "")}
          >
            Início
          </NavLink>
          <NavLink
            to="/questoes"
            className={({ isActive }) => (isActive ? "ativo" : "")}
          >
            Questões
          </NavLink>
          <NavLink
            to="/flashcards"
            className={({ isActive }) => (isActive ? "ativo" : "")}
          >
            Flashcards
          </NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/questoes" element={<BancoQuestoes />} />
            <Route path="/questoes/:id" element={<QuestaoDetalhe />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/flashcards" element={<Flashcards />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
