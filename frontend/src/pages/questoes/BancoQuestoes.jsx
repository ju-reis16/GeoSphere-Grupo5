import { useEffect, useState } from "react";
import CardQuestao from "./CardQuestao";

import "./bancoQuestoes.css";

// URL da API do backend
const API_BASE = "http://localhost:3000";

// Transforma as questões agrupadas por ID

function agruparQuestoes(rows) {
  const agrupadas = new Map();

  rows.forEach((row) => {
    const id = Number(row.id);

    // estrutura base
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

    // Adiciona a alternativa à questão correspondente
    const questao = agrupadas.get(id);
    questao.alternativas.push(row.texto_alternativa || "");

    // Se essa alternativa é a correta, salva seu índice
    if (row.correta) {
      questao.correta = questao.alternativas.length - 1;
    }
  });

  // Retorna as questões como array
  return Array.from(agrupadas.values());
}

function BancoQuestoes() {

  const [questoes, setQuestoes] = useState([]);   // Lista completa de questões
  const [busca, setBusca] = useState("");          // Texto digitado na busca
  const [carregando, setCarregando] = useState(true); // Controla o estado de loading
  const [erro, setErro] = useState("");            // Mensagem de erro, se houver

  //questões do backend 
  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        setCarregando(true);
        setErro("");

        const response = await fetch(
          `${API_BASE}/questoes-vestibulares`
        );

        // erro se o servidor retornar status de falha
        if (!response.ok) {
          throw new Error(`Erro ao carregar questões: ${response.status}`);
        }

        const dados = await response.json();

        // agrupa e salva as questões 
        setQuestoes(agruparQuestoes(Array.isArray(dados) ? dados : []));
      } catch {
        setErro("Não foi possível carregar as questões do backend.");
      } finally {
        // encerra o loading independente de sucesso ou erro
        setCarregando(false);
      }
    };

    carregarQuestoes();
  }, []); // Executa apenas uma vez

  // Filtra as questões com base no texto digitado
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
    <div className="container banco-questoes-page">
      <h1 className="page-title">Banco de Questões</h1>

      <p className="page-subtitle">
        Pratique com {questoes.length} questões de vestibular disponíveis.
      </p>

      {/* botões de filtragem por categoria, tema, vestibular etc. */}
      <div className="barra-pesquisa">

  <select className="select-filtro">
    <option>Selecione o filtro</option>
    <option>Categoria</option>
    <option>Tema</option>
    <option>Vestibulares</option>
    <option>Palavra</option>
  </select>

  <input
    className="input-busca"
    type="text"
    placeholder="Digite o que deseja buscar..."
  />
</div>

      {/* Grade de cards: exibe erro, loading, questões ou mensagem de lista vazia */}
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
  );
}

export default BancoQuestoes;