import React from "react";
import { Link } from "react-router-dom";

import './styles/Home.css';

function Home() {
  return (
    <div>
      <MainSection />
      <StatisticsSection />
    </div>
  )
}

const MainSection = () => (
  <section className="main-section">
    <div className="content">
      <h1>Pesquise autores e citações!</h1>
      <p>Explore e analise a trajetória acadêmica de pesquisadores de diversas áreas do conhecimento. Nosso portal oferece uma ferramenta avançada de busca que permite acessar dados completos sobre autores científicos de todo o mundo.</p>
      <Link to="/Search">
        <button>Experimente</button>
      </Link>
    </div>
    <div className="image">
      <img src="home.svg" alt="Pesquisa de autores e citações" />
    </div>
  </section>
);

const StatisticsSection = () => (
  <section className="statistics-section">
    <h2>Veja as mais diversas estatísticas</h2>
    <p>Veja informações detalhadas, como:</p>
    <ul>
      <li><strong>Citações:</strong> Acompanhe o impacto das publicações através de citações em artigos de alto prestígio.</li>
      <li><strong>Afiliações:</strong> Descubra onde os pesquisadores estão baseados e em quais instituições contribuem para o avanço do conhecimento.</li>
      <li><strong>Áreas de Pesquisa:</strong> Explore as áreas de atuação e expertise de cada autor, desde ciências exatas até ciências humanas.</li>
      <li><strong>Colaborações e Redes:</strong> Entenda as conexões e colaborações entre cientistas, visualizando redes de conhecimento globalmente integradas.</li>
    </ul>
    <p>Com uma interface intuitiva e dados atualizados constantemente, nossa plataforma facilita a busca por especialistas e o entendimento do impacto científico. Pesquise agora e obtenha uma visão completa sobre o desempenho e a relevância dos autores no cenário acadêmico.</p>
  </section>
);

export { Home }