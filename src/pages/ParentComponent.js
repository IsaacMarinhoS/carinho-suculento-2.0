import React, { useState } from 'react';
import Login from './Login';  // Importe o componente Login
import Header from './Header';  // Importe o Header

function ParentComponent() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Header setShowModal={setShowModal} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {showModal && <Login setShowModal={setShowModal} setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default ParentComponent;
