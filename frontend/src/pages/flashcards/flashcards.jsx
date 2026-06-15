import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./flashcards.css";

// URL base da API backend
const API_BASE = "http://localhost:3000";

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);  // Lista completa 
  const [aberto, setAberto] = useState(null);         // Índice do card virado
  const [filtro, setFiltro] = useState("");            // ("categoria" ou "palavra")
  const [busca, setBusca] = useState("");              // Termo digitado na busca
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca os flashcards da API 
  useEffect(() => {
    fetch(`${API_BASE}/view-flashcards`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na resposta: ${res.status}`);
        }
        return res.json();
      })
      .then((dados) => {
        setFlashcards(Array.isArray(dados) ? dados : []);
      })
      .catch(() => {
        setErro("Não foi possível carregar os flashcards do banco de dados.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  // Filtra os flashcards de acordo com o filtro
  const flashcardsFiltrados = flashcards.filter((card) => {
    // exibe todos
    if (!filtro || !busca) return true;

    // Filtra pelo nome da categoria
    if (filtro === "categoria") {
      return card.nome.toLowerCase().includes(busca.toLowerCase());
    }

    // Filtra por palavra-chave 
    if (filtro === "palavra") {
      return (
        card.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
        card.resposta.toLowerCase().includes(busca.toLowerCase())
      );
    }

    return true;
  });

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
              <p>Tente responder mentalmente antes de virar o card.</p>
            </div>
          </div>

          <div className="passo">
            <div className="numero">2</div>
            <div>
              <h4>Vire o Card</h4>
              <p>Clique para ver a resposta completa e verificar.</p>
            </div>
          </div>

          <div className="passo">
            <div className="numero">3</div>
            <div>
              <h4>Pratique</h4>
              <p>Revise os cards regularmente para fixar o conteúdo.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grade de flashcards */}
      <div className="cards-grid">
        {erro ? (
          <p>{erro}</p>
        ) : carregando ? (
          <p>Carregando flashcards...</p>
        ) : flashcardsFiltrados.length > 0 ? (
          flashcardsFiltrados.map((card, index) => (
            // Adiciona "flipped" 

            <div
              className={`flashcard-container ${aberto === index ? "flipped" : ""}`}
              key={index}
              onClick={() => setAberto(aberto === index ? null : index)}
            >
              <div className="flashcard-inner">

                {/* categoria + pergunta */}
                <div className="flashcard-front">
                  {/* nome da categoria */}
                  <span
                    className={`tag ${
                      card.nome === "globalização"  ? "globalizacao"
                      : card.nome === "geopolítica" ? "geopolitica"
                      : card.nome === "imigração"   ? "imigracao"
                      : "blocos"
                    }`}
                  >
                    {card.nome}
                  </span>
                  <h3>{card.pergunta}</h3>
                  <p className="hint">Clique para revelar a resposta</p>
                </div>

                {/* resposta */}
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
          <a href="https://mail.google.com/mail/u/3/#inbox?compose=new">OUTRAS DÚVIDAS</a>
          <a href="https://canva.link/9r30t9izr15v7f1">TUTORIAL DE USO</a>
          <a href="https://canva.link/kqlek4d59qiux5d">MATERIAL AUXILIAR</a>

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