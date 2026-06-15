function Gabarito({
  alternativaCorreta, // "A", "B" "C"...
  explicacao          // Texto explicando o porquê da resposta
}) {

  return (
    <div className="gabarito">

      <h3>Gabarito explicado</h3>

      <p>
        <strong>
          Alternativa {alternativaCorreta}
        </strong>
      </p>

      <p>{explicacao}</p>

    </div>
  );
}

export default Gabarito;