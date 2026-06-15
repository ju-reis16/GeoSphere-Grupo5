import { Link } from "react-router-dom";
import AzizImage from "../../assets/azis.jpg";
import MiltonImage from "../../assets/milton.jpg";
import "./autores.css";

function Autores() {
  return (
    <div className="container">
      <section className="hero">
        <h2>Autores</h2>
        <p>Conheça os geógrafos que inspiram a nossa visão sobre território, globalização e urbanismo.</p>

        <div className="autor-grid">
          <div className="autor-card">
            <img className="autor-image" src={AzizImage} alt="Aziz Ab'Saber" />
            <h3>Aziz Ab'Saber</h3>
            <p className="autor-role">Geógrafo e professor brasileiro</p>
            <p>
              Aziz Ab'Sáber (1924-2012) foi um dos mais importantes geógrafos e ambientalistas do Brasil. Nascido em São Luiz do Paraitinga, no estado de São Paulo, dedicou sua vida ao estudo do relevo, da vegetação e dos ecossistemas brasileiros, tornando-se professor da Universidade de São Paulo (USP).
            </p>
            <p>
              Seu principal destaque foi a criação da classificação dos domínios morfoclimáticos do Brasil, que ajudou a compreender melhor as características naturais do país. Seus estudos contribuíram para a Geografia, para a preservação ambiental e para o planejamento do uso dos recursos naturais brasileiros.
            </p>
          </div>

          <div className="autor-card">
            <img className="autor-image" src={MiltonImage} alt="Milton Santos" />
            <h3>Milton Santos</h3>
            <p className="autor-role">Geógrafo crítico e pensador urbano</p>
            <p>
              Milton Santos (1926–2001) foi um dos mais importantes geógrafos brasileiros e uma referência mundial na área da Geografia. Nascido em Brotas de Macaúbas, na Bahia, formou-se em Direito, mas dedicou sua carreira ao estudo do espaço geográfico, da urbanização e da globalização.
            </p>
            <p>
              Ao longo de sua trajetória, lecionou em universidades no Brasil e no exterior e publicou diversas obras influentes. Em 1994, recebeu o Prêmio Vautrin Lud, considerado o “Nobel da Geografia”, por suas contribuições ao entendimento das transformações sociais e econômicas do mundo contemporâneo.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="links">
          <Link to="/sobre-nos">SOBRE NÓS</Link>
          <Link to="/autores">AUTORES</Link>
          <a href="https://mail.google.com/mail/u/3/#inbox?compose=new">OUTRAS DÚVIDAS</a>
          <a href="https://canva.link/9r30t9izr15v7f1">TUTORIAL DE USO</a>
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

export default Autores;
