export default function Modal({ children, title, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="btn btn-secondary" onClick={closeModal}>
            x
          </button>
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

