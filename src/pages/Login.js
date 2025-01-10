import React, { useState, useEffect } from "react";
import "./Login.css";

function Login({ setShowModal, setIsLoggedIn, setUserType, setShowRegistration }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
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

  const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateEmailWithAPI = async (email) => {
    const apiKey = "00bb7d7261594f4cbbdf9541c2803af0"; // Substitua pela sua chave
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Resposta da API:", data); // Debug
      if (!response.ok) {
        throw new Error(`Erro da API: ${response.status}`);
      }

      return data.deliverability === "DELIVERABLE" && data.is_valid_format?.value && !data.is_disposable_email?.value;
    } catch (error) {
      console.error("Erro ao validar e-mail:", error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmailFormat(email)) {
      setErrorMessage("Formato de e-mail inválido.");
      return;
    }

    setIsValidating(true);
    const emailIsValid = await validateEmailWithAPI(email);
    setIsValidating(false);

    if (!emailIsValid) {
      setErrorMessage("E-mail inválido ou não verificável.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.username === username && u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
      setIsLoggedIn(true);
      setUserType(user.isAdmin ? 'admin' : 'user');
      setShowModal(false);
    } else {
      setErrorMessage('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
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
          <button type="submit" disabled={isValidating}>
            {isValidating ? "Validando..." : "Entrar"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Não tem uma conta?{' '}
          <span onClick={() => setShowRegistration(true)}>Crie uma conta</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
