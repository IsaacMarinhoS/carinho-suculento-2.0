import React from "react";
import Slider from "react-slick";
import "./Hero.css";
import img from "./img/img.jpeg";
import img2 from "./img/img2.jpeg";
import img3 from "./img/img3.jpeg";
import img4 from "./img/img4.jpeg";

function Hero() {
  const settings = {
    dots: true, // Exibe os pontos para navegação
    infinite: true, // Permite navegação infinita
    speed: 100, // Velocidade da transição entre as imagens
    slidesToShow: 1, // Mostra uma imagem por vez
    slidesToScroll: 1, // Desloca uma imagem por vez
    autoplay: true, // Faz com que as imagens troquem automaticamente
    autoplaySpeed: 3000, // Tempo de intervalo entre as trocas
  };

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
        <a href="/galeria" className="btn">
          Explore a Galeria
        </a>
      </div>
      <div className="hero-carousel">
        <Slider {...settings}>
          <div>
            <img className="hero-image" src={img} alt="Flores 1" />
          </div>
          <div>
            <img className="hero-image" src={img2} alt="Flores 2" />
          </div>
          <div>
            <img className="hero-image" src={img3} alt="Flores 3" />
          </div>
          <div>
            <img className="hero-image" src={img4} alt="Flores 4" />
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default Hero;
