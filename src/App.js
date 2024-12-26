import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import './App.css';

function App() {
  // Estados para controle do login, exibição do modal e tipo de usuário
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  // Verifica o login no localStorage ao carregar a página
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setIsLoggedIn(true);
      setUserType("admin");
    } else if (isAdmin === "false") {
      setIsLoggedIn(true);
      setUserType("user");
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, []);

  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowModal={setShowModal}
        userType={userType}
      />
      {showModal && !showRegistration && (
        <Login
          setShowModal={setShowModal}
          setIsLoggedIn={setIsLoggedIn}
          setUserType={setUserType}
          setShowRegistration={setShowRegistration}
        />
      )}

      {showRegistration && (
        <Register
          setShowRegistration={setShowRegistration}
          setIsLoggedIn={setIsLoggedIn}
          setUserType={setUserType}
          setShowModal={setShowModal}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/servicos" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
