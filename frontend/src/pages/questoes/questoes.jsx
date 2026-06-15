import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Alternativa from "./alternativaQ";
import Gabarito from "./Gabarito";

import "./questao.css";

// URL da API do backend
const API_BASE = "http://localhost:3000";

// Transforma os dados da API em um objeto unico
function agruparQuestao(rows) {
  if (!rows || rows.length === 0) {
    return null;
  }

  const primeira = rows[0]; // Primeira linha: dados gerais da questão
  const alternativas = rows.map((row) => row.texto_alternativa || "");
  const correta = rows.findIndex((row) => row.correta);

  return {
    id: Number(primeira.id),
    titulo: `Questão ${primeira.id}`,
    categoria: primeira.categoria || "Sem categoria",
    vestibular: primeira.vestibular || "",
    pergunta: primeira.pergunta || "",
    alternativas,
    correta: correta >= 0 ? correta : 0, // Fallback para índice 0 se não encontrar
    explicacao: "Explicação não disponível no backend ainda.",
  };
}

function QuestaoDetalhe() {

  const { id } = useParams();   // ID da questão vindo pela URL
  const navigate = useNavigate();

  const [questao, setQuestao] = useState(null);       // Dados da questão carregada
  const [selecionada, setSelecionada] = useState(null); // Índice da alternativa selecionada
  const [respondeu, setRespondeu] = useState(false);  // Se o usuário já confirmou a resposta
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca a questão pelo ID quando o componente é montado ou quando o ID muda
  useEffect(() => {
    const carregarQuestao = async () => {
      try {
        setCarregando(true);
        setErro("");

        const response = await fetch(`${API_BASE}/questoes/${id}`);

        if (!response.ok) {
          throw new Error(`Erro ao carregar questão: ${response.status}`);
        }

        const dados = await response.json();
        const questaoAgrupada = agruparQuestao(
          Array.isArray(dados) ? dados : []
        );

        // Se a API retornar vazio
        if (!questaoAgrupada) {
          setErro("Questão não encontrada.");
          setQuestao(null);
          return;
        }

        setQuestao(questaoAgrupada);
      } catch {
        setErro("Não foi possível carregar a questão.");
      } finally {
        setCarregando(false);
      }
    };

    carregarQuestao();
  }, [id]);

  // Confirma a resposta, apenas selecionada
  const responder = () => {
    if (selecionada === null) return;
    setRespondeu(true);
  };

  const letras = ["a", "b", "c", "d", "e"];

  return (
    <div className="pagina-questao">
      <div className="questao-box">

        <button
          className="btn-voltar"
          onClick={() => navigate("/questoes")}
        >
          ← Voltar
        </button>

        {carregando ? (
          <p>Carregando questão...</p>
        ) : erro ? (
          <p>{erro}</p>
        ) : questao ? (
          <>
            <div className="texto-questao">
              <p className="referencia">
                {questao.vestibular}
                {questao.vestibular && questao.categoria ? " · " : ""}
                {questao.categoria}
              </p>
              <h2>{questao.pergunta}</h2>
            </div>

            <div className="alternativas">
              {questao.alternativas.map((alt, index) => (
                <Alternativa
                  key={index}
                  letra={letras[index]}
                  texto={alt}
                  index={index}
                  correta={questao.correta}
                  selecionada={selecionada}
                  respondeu={respondeu}
                  onSelect={setSelecionada}
                />
              ))}
            </div>

            {/* Botão desabilitado se nenhuma alternativa for selecionada */}
            <button
              className="btn-responder"
              onClick={responder}
              disabled={respondeu || selecionada === null}
            >
              Responder
            </button>

            {respondeu && (
              <Gabarito
                alternativaCorreta={letras[questao.correta] || "?"}
                explicacao={questao.explicacao}
              />
            )}
          </>
        ) : null}

      </div>
    </div>
  );
}

export default QuestaoDetalhe;