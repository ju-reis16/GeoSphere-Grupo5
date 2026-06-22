import { Link } from "react-router-dom";
import "./sobre_nos.css";

function SobreNos() {
  return (
    <>
    <section className="hero">
        <h2><strong>GeoSphere: Geografia para Vestibulares</strong></h2>
        <p>
          <strong>
          O GeoSphere é um site criado pelo nosso grupo para ajudar estudantes a
          se prepararem para vestibulares por meio de questões comentadas e
          flashcards de Geografia.
          </strong>
        </p>
      </section>
    <div className="container">
            <section className="sobre-conteudo">
        <div className="sobre-section">
          <h3>O projeto</h3>
          <p>
            O GeoSphere surgiu como nosso projeto final do curso técnico no SENAI,
            proposto pelos professores Leandro Ribeiro Grosso, Antonio Tupinamba
            Timbira de Oliveira Pinto Filho, Eduardo Cesar Correia e Odair Messias
            Junior. O desafio era desenvolver uma solução tecnológica utilizando os
            conhecimentos que adquirimos durante o curso.
          </p>
          <p>
            Pensando em criar algo útil para outros estudantes, escolhemos desenvolver uma plataforma de estudos de Geografia que reunisse conteúdos, questões de vestibulares e flashcards em um único ambiente, tornando a preparação para as provas mais prática, organizada e acessível.
          </p>
        </div>

        <div className="sobre-section">
          <h3>Equipe</h3>
          <p>
            O projeto foi desenvolvido pelas alunas Sofia Borborema Boscatti, Lais Vitória de Brito da Silva, Karen Pereira Gesualdo, Manuela de Camargo Silva e Julia Machado Reis, com a orientação da professora Edna Cristina Matos Lira Gomes.
          </p>
        </div>

        <div className="sobre-section">
          <h3>Pesquisa e seleção de conteúdos</h3>
          <p>
            Antes de iniciar a construção do site, tivemos uma conversa com a professora para identificar os temas de Geografia que mais aparecem nos vestibulares. A partir dessa pesquisa, selecionamos e organizamos 30 questões, abordando assuntos como Globalização, Geopolítica, Migrações, Blocos Econômicos, Urbanização, Meio Ambiente, Mudanças Climáticas e muitos outros temas importantes para quem está se preparando para provas como ENEM, FUVEST, UNICAMP e VUNESP.
          </p>
        </div>

        <div className="sobre-section">
          <h3>Tecnologias utilizadas</h3>
          <p>
            Para desenvolver o GeoSphere, utilizamos diversas ferramentas tecnológicas. O design e a prototipação foram criados no Figma, onde planejamos toda a aparência e navegação do site. Já a programação foi realizada no Visual Studio Code, utilizando JSX, JavaScript, CSS e PostgreSQL. Também utilizamos o Insomnia para realizar testes e verificar o funcionamento das integrações do sistema.
          </p>
        </div>

        <div className="sobre-section">
          <h3>Como o site funciona?</h3>
          <p>
            Ao entrar no GeoSphere, o usuário é recebido pela página inicial (Home), onde encontra explicações sobre temas importantes da Geografia, como Globalização, Migração, Blocos Econômicos e Geopolítica. Essa parte foi criada para ajudar os estudantes a revisarem os conceitos antes de praticarem.
          </p>
          <p>
            Ao clicar em "Praticar Questões", o usuário é direcionado para o Banco de Questões, onde pode escolher exercícios de diferentes categorias. Os temas são identificados por cores diferentes para facilitar a navegação e a organização dos estudos. Caso queira voltar para a página inicial, basta clicar em "Início".
          </p>
          <p>
            Depois de responder uma questão, o sistema mostra automaticamente o resultado: a alternativa correta aparece em verde, enquanto as incorretas ficam em vermelho. Além disso, cada questão possui um comentário explicativo elaborado por um especialista, ajudando o estudante a entender melhor o conteúdo e aprender com seus erros.
          </p>
          <p>
            Outra funcionalidade do GeoSphere é a seção "Estudar com Flashcards". Nela, o usuário encontra cartões de estudo com conceitos importantes de Geografia. Para visualizar a resposta, basta clicar no card e virá-lo. Esse recurso ajuda na memorização dos conteúdos de forma rápida, prática e divertida.
          </p>
        </div>

        <div className="sobre-section">
          <h3>Nosso objetivo</h3>
          <p>
            Mais do que criar um simples site de perguntas e respostas, nosso objetivo foi desenvolver uma ferramenta que realmente ajudasse os estudantes a aprender Geografia de maneira mais eficiente. Queríamos criar um ambiente de estudos que reunisse teoria, prática e revisão em um só lugar, tornando a preparação para os vestibulares mais organizada e motivadora.
          </p>
          <p>
            Durante o desenvolvimento do projeto, buscamos aplicar os conhecimentos adquiridos ao longo do curso técnico, enfrentando desafios relacionados ao design, programação, banco de dados e experiência do usuário. Essa experiência nos permitiu não apenas aprimorar nossas habilidades técnicas, mas também desenvolver competências como trabalho em equipe, organização, comunicação e resolução de problemas.
          </p>
          <p>
            O GeoSphere representa não apenas um projeto de tecnologia, mas também o resultado do nosso esforço, dedicação e aprendizado durante o curso.
          </p>
        </div>
      </section>
  
    </div>
    <footer>
        <div className="links">
          <Link to="/sobre-nos">SOBRE NÓS</Link>
          <Link to="/autores">AUTORES</Link>
          <a href="https://mail.google.com/mail/u/3/#inbox?compose=new">OUTRAS DÚVIDAS</a>
          <a href="https://canva.link/9r30t9izr15v7f1">TUTORIAL DE USO</a>
          <a href="https://canva.link/kqlek4d59qiux5d">MATERIAL AUXILIAR</a>

        </div>

        <div className="contato">
          <h3>let's be friends.</h3>
          <p>Email Address:</p>
          <p>geosphere@gmail.com</p>
        </div>
      </footer>
      </>
  );
}

export default SobreNos;
