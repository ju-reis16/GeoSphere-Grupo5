import "./App.css";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

// Home
import Home from "./pages/home/home";
import Questoes from "./pages/questoes/questoes";
import QuestaoDetalhe from "./pages/questoes/questaoDetalhe";
import Autores from "./pages/autores/autores";
import SobreNos from "./pages/sobre-nós/sobre_nos";
import Flashcards from "./pages/flashcards/flashcards";

// Login
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="logo">
          <h1>GeoSphere</h1>
          <p>Geografia para vestibulares</p>
        </div>

        <nav>
          <NavLink to="/home" className={({ isActive }) => isActive ? "ativo" : ""}>
            Início
          </NavLink>
          <NavLink to="/questoes" className={({ isActive }) => isActive ? "ativo" : ""}>
            Questões
          </NavLink>
          <NavLink to="/flashcards" className={({ isActive }) => isActive ? "ativo" : ""}>
            Flashcards
          </NavLink>
        </nav>
      </header>

      <Routes>
        {/*  login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        {/*Home*/}
        <Route path="/home" element={<Home />} />
        <Route path="/questoes" element={<Questoes />} />
        <Route path="/questoes/:id" element={<QuestaoDetalhe />} />
        <Route path="/autores" element={<Autores />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>
    </BrowserRouter>
  );
}