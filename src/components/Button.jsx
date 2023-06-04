function Button({ btnName, onClick, icon, disable, background }) {
  return (
    <button
      className="button mx-3"
      onClick={onClick}
      disabled={disable || false}
      style={{ background: background }}
    >
      <div className="bg">
        {btnName}
        {icon}
      </div>
    </button>
  );
}

export default Button;
