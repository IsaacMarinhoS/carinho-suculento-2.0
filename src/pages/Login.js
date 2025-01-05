import React, { useState, useEffect } from "react";
import "./Login.css";

function Login({ setShowModal, setIsLoggedIn, setUserType, setShowRegistration }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Verificar se já existe um administrador fixo no localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
      // Adicionar um admin fixo
      const admin = {
        username: "admin",
        email: "admin@admin.com",
        password: "admin123",
        isAdmin: true
      };
      users.push(admin);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  // Função de login
  const handleLogin = (e) => {
    e.preventDefault();

    // Obtém a lista de usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o nome de usuário, e-mail e senha correspondem a um usuário cadastrado
    const user = users.find(
      (u) => u.username === username && u.email === email && u.password === password
    );

    if (user) {
      // Se encontrado, armazena o tipo de usuário e realiza o login
      localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
      setIsLoggedIn(true);
      setUserType(user.isAdmin ? 'admin' : 'user');
      setShowModal(false); // Fecha o modal de login
    } else {
      setErrorMessage('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        {/* Botão de fechar modal */}
        <button className="close-button" onClick={() => setShowModal(false)}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Entrar</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Não tem uma conta?{' '}
          {/* Quando o link for clicado, mostra o modal de registro */}
          <span onClick={() => setShowRegistration(true)}>Crie uma conta</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
