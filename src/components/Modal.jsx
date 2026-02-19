function Modal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <button onClick={onCancel} style={{ marginRight: "10px" }}>
          Cancel
        </button>

        <button onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Modal;