import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./questoes.css";

function Questoes() {
  const [questoes, setQuestoes] = useState([]);
  const [aberto, setAberto] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    setCarregando(true);
    setErro("");

    fetch("http://localhost:3000/questoes-vestibulares")
      .then((res) => res.json())
      .then((dados) => {
        const agrupadas = dados.reduce((acc, item) => {
          const chave = item.pergunta;
          let questao = acc.find((q) => q.pergunta === chave);

          if (!questao) {
            questao = {
              categoria: item.categoria,
              vestibular: item.vestibular,
              pergunta: item.pergunta,
              tema: item.nomet,
              alternativas: [],
            };
            acc.push(questao);
          }

          questao.alternativas.push({
            texto: item.texto_alternativa,
            correta: item.correta,
          });

          return acc;
        }, []);

        setQuestoes(agrupadas);
      })
      .catch(() => {
        setErro("Não foi possível carregar as questões do banco de dados.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  const questoesFiltradas = questoes.filter((questao) => {
    if (!filtro || !busca) return true;

    if (filtro === "categoria") {
      return questao.categoria.toLowerCase().includes(busca.toLowerCase());
    }

    if (filtro === "tema") {
      return questao.tema.toLowerCase().includes(busca.toLowerCase());
    }

    if (filtro === "vestibular") {
      return questao.vestibular.toLowerCase().includes(busca.toLowerCase());
    }

    return questao.pergunta.toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <div className="container">
      <section className="hero">
        <h2>Banco de Questões</h2>
        <p>Pratique com 30 questões de vestibulares disponíveis.</p>

        <div className="busca">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">Selecione o filtro</option>
            <option value="palavra">Palavra-chave</option>
            <option value="categoria">Categoria</option>
            <option value="vestibular">Vestibular</option>
            <option value="tema">Tema</option>
          </select>

          <input
            type="text"
            placeholder="Digite o que deseja buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

        </div>
      </section>

      <div className="cards-grid">
        {erro ? (
          <p>{erro}</p>
        ) : carregando ? (
          <p>Carregando questões...</p>
        ) : questoesFiltradas.length > 0 ? (
          questoesFiltradas.map((questao, index) => (
            <div
              key={index}
              className={`questao-card ${aberto === index ? "open" : ""}`}
              onClick={() => setAberto(aberto === index ? null : index)}
            >
              <div className="questao-card-header">
                <span
                  className={`tag ${
                    questao.categoria === "globalização"
                      ? "globalizacao"
                      : questao.categoria === "geopolítica"
                      ? "geopolitica"
                      : questao.categoria === "imigração"
                      ? "imigracao"
                      : "blocos"
                  }`}
                >
                  {questao.categoria}
                </span>
                <h3>{questao.pergunta}</h3>
                <p className="hint">Clique para abrir a questão</p>
              </div>

              {aberto === index && (
                <div className="questao-detalhe">
                  <p className="meta">Vestibular: {questao.vestibular}</p>
                  <div className="alternativas">
                    {questao.alternativas.map((alternativa, altIndex) => (
                      <div className="alternativa" key={altIndex}>
                        <strong>{String.fromCharCode(97 + altIndex)}</strong>
                        <span>{alternativa.texto}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Nenhuma questão encontrada.</p>
        )}
      </div>

      <footer>
        <div className="links">
          <Link to="/sobre-nos">SOBRE NÓS</Link>
          <Link to="/autores">AUTORES</Link>
          <p>OUTRAS DÚVIDAS</p>
        </div>

        <div className="contato">
          <h3>let's be friends.</h3>
          <p>Email Address:</p>
          <p>geosphere@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}

export default Questoes;
