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
          throw new Error(
            `Erro ao carregar questões: ${response.status}`
          );
        }

        const dados = await response.json();

        setQuestoes(
          agruparQuestoes(Array.isArray(dados) ? dados : [])
        );
      } catch {
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
      <div className="container banco-questoes-page">
        <h1 className="page-title">Banco de Questões</h1>

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

        <input
          className="input-busca"
          type="text"
          placeholder="Buscar por..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

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
      </div>

      <footer>
        <div className="links">
          <Link to="/sobre-nos">SOBRE NÓS</Link>

          <Link to="/autores">AUTORES</Link>

          <a href="https://mail.google.com/mail/u/3/#inbox?compose=new">
            OUTRAS DÚVIDAS
          </a>

         <a href="https://canva.link/9r30t9izr15v7f1">TUTORIAL DE USO</a>

        </div>

        <div className="contato">
          <h3>let's be friends.</h3>

          <p>Email Address:</p>

          <p>geosphere@gmail.com</p>
        </div>
      </footer>
    </>
  );
}

export default BancoQuestoes;