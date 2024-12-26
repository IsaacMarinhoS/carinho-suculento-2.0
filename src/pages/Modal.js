import React from 'react';
import './Modal.css';

function Modal({ children, setShowModal }) {
  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-button"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
