import React from "react";
import "./Features.css";


function Features() {
  return (
    <section className="features">
      <div className="feature-item">
        <h2>Flores Frescas</h2>
        <p>Garantimos a qualidade e frescor em cada buquê que criamos.</p>
      </div>
      <div className="feature-item">
        <h2>Design Personalizado</h2>
        <p>Cada buquê reflete a personalidade única de cada cliente.</p>
      </div>
      <div className="feature-item">
        <h2>Entrega Rápida</h2>
        <p>Entregamos seu buquê no tempo certo para o evento especial.</p>
      </div>
    </section>
  );
}

export default Features;