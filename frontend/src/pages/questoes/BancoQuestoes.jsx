import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardQuestao from "./CardQuestao";

import "./bancoQuestoes.css";

const API_BASE = "http://localhost:3000";

function agruparQuestoes(rows) {
  const agrupadas = new Map();

  rows.forEach((row) => {
    const id = Number(row.id);

    if (!agrupadas.has(id)) {
      agrupadas.set(id, {
        id,
        titulo: `Questão ${id}`,
        categoria: row.categoria || "Sem categoria",
        vestibular: row.vestibular || "",
        pergunta: row.pergunta || "",
        alternativas: [],
        correta: null,
      });
    }

    const questao = agrupadas.get(id);
    questao.alternativas.push(row.texto_alternativa || "");

    if (row.correta) {
      questao.correta = questao.alternativas.length - 1;
    }
  });

  return Array.from(agrupadas.values());
}

function BancoQuestoes() {

  const [questoes, setQuestoes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        setCarregando(true);
        setErro("");

        const response = await fetch(
          `${API_BASE}/questoes-vestibulares`
        );

        if (!response.ok) {
          throw new Error(`Erro ao carregar questões: ${response.status}`);
        }

        const dados = await response.json();

        setQuestoes(agruparQuestoes(Array.isArray(dados) ? dados : []));
      } catch (error) {
        setErro("Não foi possível carregar as questões do backend.");
      } finally {
        setCarregando(false);
      }
    };

    carregarQuestoes();
  }, []);

  const filtradas = questoes.filter((q) => {
    const termo = busca.toLowerCase();

    return (
      q.titulo.toLowerCase().includes(termo) ||
      q.pergunta.toLowerCase().includes(termo) ||
      q.categoria.toLowerCase().includes(termo) ||
      q.vestibular.toLowerCase().includes(termo)
    );
  });

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
          <Link to="/home">Início</Link>

          <Link to="/questoes" className="active">
            Questões
          </Link>

          <Link to="/flashcards">
            Flashcards
          </Link>
        </nav>

      </header>

      {/* CONTEÚDO */}

      <main className="container">

        <h1 className="page-title">
          Banco de Questões
        </h1>

        <p className="page-subtitle">
          Pratique com {questoes.length} questões de vestibular disponíveis.
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

          {erro ? (
            <p>{erro}</p>
          ) : carregando ? (
            <p>Carregando questões...</p>
          ) : filtradas.length > 0 ? (
            filtradas.map((questao) => (

              <CardQuestao
                key={questao.id}
                questao={questao}
              />

            ))
          ) : (
            <p>Nenhuma questão encontrada.</p>
          )}

        </div>

      </main>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-content">

          <div className="footer-links">

            <Link to="/home">
              INÍCIO
            </Link>

            <Link to="/sobre-nos">
              SOBRE
            </Link>

            <Link to="/autores">
              CONTATO
            </Link>

            <Link to="/questoes">
              POLÍTICA DE PRIVACIDADE
            </Link>

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