import React, { useState } from "react";
import "./Header.css";

function Header({ setShowModal, isLoggedIn, setIsLoggedIn }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Estado para controlar o modal de logout

  // Função para lidar com o clique no botão de login/logado
  const handleButtonClick = () => {
    if (isLoggedIn) {
      // Exibe o modal de confirmação de logout
      setShowLogoutConfirm(true);
    } else {
      // Exibe o modal de login
      setShowModal(true);
    }
  };

  // Função para confirmar o logout
  const confirmLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove a informação de login
    setIsLoggedIn(false); // Altera o estado para deslogado
    setShowLogoutConfirm(false); // Fecha o modal de confirmação
  };

  // Função para cancelar o logout
  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Apenas fecha o modal sem deslogar
  };

  return (
    <header className="header">
      <a href="/" className="logo">Carinho Suculento</a>
      <nav className="navbar">
        <a href="/galeria" className="nav-link">Galeria</a>
        <a href="/contato" className="nav-link">Contato</a>
        <a href="/servicos" className="nav-link">Sobre</a>
        <button
          className="login-button"
          onClick={handleButtonClick}
        >
          {isLoggedIn ? "Logado" : "Login"}
        </button>
      </nav>

      {/* Modal de Confirmação de Logout */}
      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="modal-content">
            <h3>Deseja realmente sair da sua conta?</h3>
            <button onClick={confirmLogout}>Sim</button>
            <button onClick={cancelLogout}>Não</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
