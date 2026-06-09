import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./flashcards.css";

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [aberto, setAberto] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    console.log("Iniciando fetch de flashcards...");
    setCarregando(true);
    setErro("");

    fetch("http://localhost:3000/view-flashcards")
      .then((res) => {
        console.log("Status:", res.status);
        if (!res.ok) {
          throw new Error(`Erro na resposta: ${res.status}`);
        }
        return res.json();
      })
      .then((dados) => {
        console.log("Dados recebidos:", dados);
        setFlashcards(Array.isArray(dados) ? dados : []);
      })
      .catch((erro) => {
        console.error("Erro ao carregar flashcards:", erro);
        setErro("Não foi possível carregar os flashcards do banco de dados.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  // Filtrar flashcards baseado no tipo de filtro e termo de busca
  const flashcardsFiltrados = flashcards.filter((card) => {
    // Se não tem filtro ou busca, mostra todos
    if (!filtro || !busca) return true;

    // Filtrar por categoria
    if (filtro === "categoria") {
      return card.nome.toLowerCase().includes(busca.toLowerCase());
    }
    // Filtrar por palavra-chave na pergunta ou resposta
    else if (filtro === "palavra") {
      return (
        card.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
        card.resposta.toLowerCase().includes(busca.toLowerCase())
      );
    }

    return true;
  });

  const handleBuscar = () => {
    console.log("Buscar:", filtro, busca);
  };

  return (
    <div className="container">
      <section className="hero">
        <h2>Flashcards de estudo</h2>

        <div className="busca">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">Selecione o filtro</option>
            <option value="palavra">Palavra-chave</option>
            <option value="categoria">Categoria</option>
          </select>

          <input
            type="text"
            placeholder="Digite o que deseja buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

        
        </div>

        <p>
          💡 Dica: Clique em um card para virá-lo e ver a resposta. Use os flashcards para memorizar conceitos importantes.
        </p>
      </section>

      <div className="tutorial">
        <h2>Como usar os flashcards?</h2>

        <div className="tutorial-grid">
          <div className="passo">
            <div className="numero">1</div>

            <div>
              <h4>Leia a Pergunta</h4>

              <p>
                Tente responder mentalmente antes de virar o card.
              </p>
            </div>
          </div>

          <div className="passo">
            <div className="numero">2</div>

            <div>
              <h4>Vire o Card</h4>

              <p>
                Clique para ver a resposta completa e verificar.
              </p>
            </div>
          </div>

          <div className="passo">
            <div className="numero">3</div>

            <div>
              <h4>Pratique</h4>

              <p>
                Revise os cards regularmente para fixar o conteúdo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        {erro ? (
          <p>{erro}</p>
        ) : carregando ? (
          <p>Carregando flashcards...</p>
        ) : flashcardsFiltrados.length > 0 ? (
          flashcardsFiltrados.map((card, index) => (
            <div
              className={`flashcard-container ${aberto === index ? "flipped" : ""}`}
              key={index}
              onClick={() => setAberto(aberto === index ? null : index)}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <span
                    className={`tag ${
                      card.nome === "globalização"
                        ? "globalizacao"
                        : card.nome === "geopolítica"
                        ? "geopolitica"
                        : card.nome === "imigração"
                        ? "imigracao"
                        : "blocos"
                    }`}
                  >
                    {card.nome}
                  </span>
                  <h3>{card.pergunta}</h3>
                  <p className="hint">Clique para revelar a resposta</p>
                </div>

                <div className="flashcard-back">
                  <p>{card.resposta}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum flashcard encontrado.</p>
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

export default Flashcards;