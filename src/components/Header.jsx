function Header({ heading, fontSize, color }) {
  return <p style={{ fontSize: fontSize || 24, color: color }}>{heading}</p>;
}

export default Header;
