import "./Header.css";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";

function Header(props) {
  const { pathname } = useLocation();

  return (
    <header
      className={`header ${pathname === "/" ? " header_main-theme" : ""}`}
    >
      <Logo />
      <Navigation loggedIn={props.loggedIn} pathname={pathname} />
    </header>
  );
}

export default Header;
