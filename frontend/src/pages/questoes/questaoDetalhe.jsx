import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./questoes.css";

function QuestaoDetalhe() {
  const { id } = useParams();
  const [questao, setQuestao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/questoes/${id}`)
      .then((res) => res.json())
      .then((dados) => {
        if (!dados || dados.length === 0) {
          setErro("Questão não encontrada.");
          return;
        }

        const questionData = {
          id: dados[0].id,
          categoria: dados[0].categoria,
          vestibular: dados[0].vestibular,
          pergunta: dados[0].pergunta,
          tema: dados[0].nomet,
          alternativas: dados.map((item) => ({
            texto: item.texto_alternativa,
            correta: item.correta,
          })),
        };

        setQuestao(questionData);
      })
      .catch((fetchError) => {
        console.error("Erro ao carregar questão:", fetchError);
        setErro("Falha ao carregar a questão.");
      })
      .finally(() => setCarregando(false));
  }, [id]);

  return (
    <div className="container">
      <section className="hero">
        <h2>Detalhe da Questão</h2>
        <p>Veja a questão completa, com alternativas e identificação do vestibular.</p>
      </section>

      <div className="questao-detalhe-page">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          Voltar
        </button>

        {carregando && <p>Carregando questão...</p>}
        {erro && <p>{erro}</p>}

        {questao && (
          <div className="questao-detalhe-card">
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
              <p className="meta">Vestibular: {questao.vestibular}</p>
              <p className="meta">Tema: {questao.tema}</p>
            </div>

            <div className="alternativas">
              {questao.alternativas.map((alternativa, index) => (
                <div
                  key={index}
                  className={`alternativa ${alternativa.correta ? "correta" : ""}`}
                >
                  <strong>{String.fromCharCode(97 + index)})</strong>
                  <span>{alternativa.texto}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestaoDetalhe;
