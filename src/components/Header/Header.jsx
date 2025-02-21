import logo from "../../images/header__logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Logotipo em branco da Around The U.S."
        className="header__logo"
      />
    </header>
  );
}
