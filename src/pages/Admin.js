// src/pages/Admin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Alterado para 'useNavigate'

const Admin = () => {
  const navigate = useNavigate(); // Alterado para 'useNavigate'
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    // Remove a informação do localStorage e redireciona para a página de login
    localStorage.removeItem("isAdmin");
    navigate("/login"); // Alterado para 'navigate'
  };

  return (
    <div>
      <h1>Página de Admin</h1>
      <button onClick={handleLogout}>Sair</button>
      <div>
        <input type="file" onChange={handleImageUpload} />
        {image && <img src={image} alt="Imagem Upload" />}
      </div>
    </div>
  );
};

export default Admin;
