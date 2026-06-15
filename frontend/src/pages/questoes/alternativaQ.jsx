// Componente da alternativa 
function Alternativa({
  letra,      // Letra da alternativa
  texto,      // Texto da alternativa
  index,      // Índice numérico da alternativa
  selecionada,// Índice da alternativa que o usuário selecionou
  correta,    // Índice da alternativa correta
  respondeu,  // Se o usuário já respondeu a questão
  onSelect    // Função ao selecionar uma alternativa
}) {

  //classe card
  let classe = "alternativa-card";

  if (respondeu) {

    // Destaca a alternativa correta em verde
    if (index === correta) {
      classe += " correta";
    }

    // Destaca a alternativa errada em vermelho
    if (
      index === selecionada &&
      index !== correta
    ) {
      classe += " errada";
    }
  }

  return (
    <div
      className={classe}
      // Só permite selecionar se ainda não respondeu
      onClick={() =>
        !respondeu && onSelect(index)
      }
    >

      {/* Se a alternativa for a correta */}
      {respondeu &&
        index === correta && (
          <span className="status-label status-correta">
            RESPOSTA CORRETA
          </span>
      )}

      {/*Se a selecionada está errada */}
      {respondeu &&
        index === selecionada &&
        index !== correta && (
          <span className="status-label status-errada">
            RESPOSTA ERRADA
          </span>
      )}

      <label>

        {/* Radio quando esta alternativa está selecionada */}
        <input
          type="radio"
          checked={selecionada === index}
          readOnly
        />

        <span>
          <strong>{letra}</strong> {texto}
        </span>

      </label>

    </div>
  );
}

export default Alternativa;