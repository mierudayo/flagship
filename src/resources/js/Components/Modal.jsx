import { useEffect } from 'react';

export default function Modal({ children, title, closeModal }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className="modal">
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="btn btn-secondary" onClick={closeModal}>
            x
          </button>
        </header>
        <div className="modal-body is-scrollable">
          {children}
        </div>
      </div>
    </div>
  );
}
