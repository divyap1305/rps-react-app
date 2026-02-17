function Modal({ title, message, onCancel, onConfirm }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
        width: "300px"
      }}>
        <h3>{title}</h3>
        <p>{message}</p>

        <button
          style={{ marginRight: "10px" }}
          onClick={onCancel}
        >
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
