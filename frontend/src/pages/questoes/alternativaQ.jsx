function Alternativa({
  letra,
  texto,
  index,
  selecionada,
  correta,
  respondeu,
  onSelect
}) {

  let classe = "alternativa-card";

  if (respondeu) {

    if (index === correta) {
      classe += " correta";
    }

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
      onClick={() =>
        !respondeu && onSelect(index)
      }
    >

      {respondeu &&
        index === correta && (
          <span className="status-label status-correta">
            RESPOSTA CORRETA
          </span>
      )}

      {respondeu &&
        index === selecionada &&
        index !== correta && (
          <span className="status-label status-errada">
            RESPOSTA ERRADA
          </span>
      )}

      <label>

        <input
          type="radio"
          checked={selecionada === index}
          readOnly
        />

        <span>
          <strong>{letra})</strong> {texto}
        </span>

      </label>

    </div>
  );
}

export default Alternativa;