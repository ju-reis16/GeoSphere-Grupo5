import { Link } from "react-router-dom";

function CardQuestao({ questao }) {
  return (
    <div className="card">

      <span className="categoria">
        {questao.categoria}
      </span>

      <h3>{questao.titulo}</h3>

      <p>{questao.pergunta}</p>

      <div className="footer-card">
        <span>
          {questao.alternativas.length} alternativas
        </span>

        <Link to={`/questao/${questao.id}`}>
          Resolver →
        </Link>
      </div>

    </div>
  );
}

export default CardQuestao;