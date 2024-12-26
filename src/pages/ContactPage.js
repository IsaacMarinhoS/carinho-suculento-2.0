import React from "react";
import "./Contato.css";


function ContactPage() {
  return (
    <section className="contact-container">
      <div className="contact-header">
        <h1>Fale Conosco</h1>
        <p>Entre em contato de forma simples e rápida</p>
      </div>

      <div className="contact-cards">
        <a href="https://wa.me/24988289778" className="contact-card">
          <h2>Telefone / Whatsapp</h2>
          <p>(24) 988289778</p>
          
        </a>

        <a href="mailto:carinhosuculento.flores2020@gmail.com" className="contact-card">
          <h2>Email</h2>
          <p>carinhosuculento.flores2020<br />@gmail.com</p>
        </a>

        <a href="https://www.instagram.com/carinhosuculento" target="_blank" rel="noopener noreferrer" className="contact-card">
          <h2>Instagram</h2>
          <p>@carinhosuculento</p>
        </a>

        <div className="contact-card">
          <h2>Endereço</h2>
          <p>Petrópolis - Corrêas</p>
        </div>
      </div>

      <div className="contact-footer">
        <p>Experiência | Cuidado | Qualidade</p>
        <p>
  Com uma paixão imensa por flores, a Carinho Suculento se especializa na criação de buquês personalizados e lembrancinhas com suculentas para casamentos e eventos especiais. Cada projeto é pensado com cuidado, garantindo que cada detalhe, desde a escolha das flores até a entrega, seja perfeito.
</p>
      </div>

      
    </section>
  );
}

export default ContactPage;
