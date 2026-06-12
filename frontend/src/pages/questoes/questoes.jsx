import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import questoes from "../data/questoes";

import Alternativa from "../components/Alternativa";
import Gabarito from "../components/Gabarito";

import "../styles/questao.css";

function QuestaoDetalhe() {

  const { id } = useParams();

  const navigate = useNavigate();

  const questao = questoes.find(
    q => q.id === Number(id)
  );

  const [selecionada, setSelecionada] =
    useState(null);

  const [respondeu, setRespondeu] =
    useState(false);

  const responder = () => {

    if (selecionada === null) return;

    setRespondeu(true);
  };

  const letras = [
    "a",
    "b",
    "c",
    "d",
    "e"
  ];

  return (

    <div className="pagina-questao">

      <div className="questao-box">

        <button
          className="btn-voltar"
          onClick={() => navigate("/")}
        >
          ← Voltar
        </button>

        <div className="texto-questao">

          <p>
            Não é possível identificar a globalização
            apenas com a criação de uma economia
            global, embora este seja seu ponto focal
            e sua característica mais óbvia.
          </p>

          <p>
            Precisamos olhar além da economia.
            Antes de tudo, a globalização depende
            da eliminação de obstáculos técnicos,
            não de obstáculos econômicos.
          </p>

          <p className="referencia">
            HOBSBAWM, E. O novo século:
            entrevista a Antonio Polito.
            São Paulo: Cia das Letras, 2000.
          </p>

          <h2>
            {questao.pergunta}
          </h2>

        </div>

        <div className="alternativas">

          {questao.alternativas.map(
            (alt, index) => (

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

            )
          )}

        </div>

        <button
          className="btn-responder"
          onClick={responder}
          disabled={
            respondeu ||
            selecionada === null
          }
        >
          Responder
        </button>

        {respondeu && (

          <Gabarito
            alternativaCorreta={
              letras[questao.correta]
            }
            explicacao={
              questao.explicacao
            }
          />

        )}

      </div>

    </div>

  );
}

export default QuestaoDetalhe;