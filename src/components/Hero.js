import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Bem-vindo à Carinho Suculento</h1>
        <h3>Roberta Marinho - Artista Floral</h3>
        <p>
          Trabalhamos com flores frescas e flores desidratadas.
          <br />
          Somos pioneiros em eternização de buquê de noiva em Petrópolis.
          <br />
          Eternizamos o seu dia tão especial.
        </p>
        <a href="/galeria" className="btn">Explore a Galeria</a>
      </div>
    </section>
  );
}

export default Hero;