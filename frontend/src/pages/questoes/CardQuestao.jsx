import { Link } from "react-router-dom";

function CardQuestao({ questao }) {
  return (
    <div className="card">

      {/* Categoria da questão */}
      <span className="categoria">
        {questao.categoria}
      </span>

      <h3>{questao.titulo || `Questão ${questao.id}`}</h3>

      <p>{questao.pergunta}</p>

      <div className="footer-card">

        <span>
          {(questao.alternativas?.length || 0)} alternativas
        </span>

        {/* Link para a página de resolução da questão */}
        <Link to={`/questoes/${questao.id}`}>
          Resolver →
        </Link>

      </div>

    </div>
  );
}

export default CardQuestao;