import { useState } from "react";
import questoes from "../data/questoes";
import CardQuestao from "../components/CardQuestao";

import "../styles/bancoQuestoes.css";

function BancoQuestoes() {

  const [busca, setBusca] = useState("");

  const filtradas = questoes.filter((q) =>
    q.titulo.toLowerCase().includes(
      busca.toLowerCase()
    )
  );

  return (
    <>
      {/* HEADER */}

      <header className="header">

        <div className="logo-area">
          <h1>GeoSphere</h1>
          <p>
            Geografia para vestibulares
          </p>
        </div>

        <nav className="nav-menu">
          <a href="/">Início</a>

          <a
            href="/"
            className="active"
          >
            Questões
          </a>

          <a href="/">
            Flashcards
          </a>
        </nav>

      </header>

      {/* CONTEÚDO */}

      <main className="container">

        <h1 className="page-title">
          Banco de Questões
        </h1>

        <p className="page-subtitle">
          Pratique com 30 questões de vestibular disponíveis.
        </p>

        {/* FILTROS */}

        <div className="filtros">

          <strong>Filtrar</strong>

          <button className="pill pill-categoria">
            Categoria
          </button>

          <button className="pill pill-tema">
            Tema
          </button>

          <button className="pill pill-vest">
            Vestibulares
          </button>

          <button className="pill pill-palavra">
            Palavra
          </button>

          <button className="pill pill-material">
            Material auxiliar
          </button>

        </div>

        {/* BUSCA */}

        <input
          className="input-busca"
          type="text"
          placeholder="Buscar por..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />

        {/* CARDS */}

        <div className="grid-cards">

          {filtradas.map((questao) => (

            <CardQuestao
              key={questao.id}
              questao={questao}
            />

          ))}

        </div>

      </main>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-content">

          <div className="footer-links">

            <a href="/">
              INÍCIO
            </a>

            <a href="/">
              SOBRE
            </a>

            <a href="/">
              CONTATO
            </a>

            <a href="/">
              POLÍTICA DE PRIVACIDADE
            </a>

          </div>

          <div className="footer-friends">
            let's be friends.
          </div>

          <div className="footer-email">

            <h4>Email Address:</h4>

            <p>
              geosphere@gmail.com
            </p>

          </div>

        </div>

        <div className="footer-bottom">
          © 2025 GEOSPHERE ALL RIGHTS RESERVED
        </div>

      </footer>
    </>
  );
}

export default BancoQuestoes;