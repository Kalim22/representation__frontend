function Details({ keys, value }) {
  return (
    <div
      style={{
        background: "#027ad6",
        padding: "4px 20px",
        margin: "10px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#fff",
      }}
      className="list"
    >
      {keys}
      <span style={{ margin: "0 30px", color: "#fff", fontSize: "20px" }}>
        -
      </span>
      {value}
    </div>
  );
}

export default Details;
