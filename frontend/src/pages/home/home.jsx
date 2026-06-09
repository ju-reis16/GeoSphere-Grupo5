import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h2>Domine a Geografia para o vestibular</h2>

        <p>
          Estude Geopolítica e Geografia Física com questões comentadas e
          conteúdo completo
        </p>

        <div className="cards">
          <div className="card">
            <h3>PRATICAR QUESTÕES</h3>

            <p>Resolva os exercícios com explicações detalhadas.</p>

            <button>30 disponíveis</button>
          </div>

          <div className="card">
            <h3>ESTUDAR COM FLASHCARDS</h3>

            <p>Memorize conceitos com cards interativos.</p>

            <button>30 disponíveis</button>
          </div>
        </div>
      </section>

      <section className="mapa">
        <div className="texto">
          <h2>O que é Geopolítica?</h2>

          <p>
            Entende-se por geopolítica todas as relações de poder que são
            estabelecidas entre diferentes países e territórios e as dinâmicas
            espaciais, políticas e econômicas diretamente associadas a elas.
            Assim, podemos dizer que a política geopolítica corresponde
            geralmente mediante o uso de estratégias e mecanismos para Estado.
          </p>
        </div>

        <div className="texto">
          <h2>O que é Geografia Física?</h2>

          <p>
            A Geografia Física é a área da ciência geográfica que cuida dos
            aspectos naturais do planeta Terra. Logo, são objeto de interesse da
            Geografia Física os elementos do relevo, da geologia, do solo, do
            clima, da vegetação e da hidrografia.
          </p>
        </div>
      </section>

      <footer>
        <div className="links">
          <Link to="/sobre-nos">SOBRE NÓS</Link>
          <Link to="/autores">AUTORES</Link>
          <p>OUTRAS DÚVIDAS</p>
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

export default Home;
