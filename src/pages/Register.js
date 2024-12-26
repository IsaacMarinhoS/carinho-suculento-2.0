import React, { useState } from "react";
import "./Register.css";

function Register({ setShowRegistration, setShowModal }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Obtém a lista de usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário já existe
    if (users.find((u) => u.email === email || u.username === username)) {
      setErrorMessage('Usuário ou e-mail já cadastrado!');
      return;
    }

    // Adiciona o novo usuário
    const newUser = { username, email, password, isAdmin: false };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setSuccessMessage('Conta criada com sucesso!');
    setTimeout(() => {
      setShowRegistration(false); // Fecha o modal de registro
      setShowModal(false); // Fecha também o modal de login (caso esteja aberto)
    }, 2000);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        {/* Botão de fechar modal */}
        <button
          className="close-button"
          onClick={() => {
            setShowRegistration(false);
            setShowModal(false); // Fecha todos os modais
          }}
        >
          &times;
        </button>
        <h2>Registrar</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Register;
