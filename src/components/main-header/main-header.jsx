import './main-header.css';
import logo from '../../assets/images/logo.png';
import { NavLink } from "react-router-dom";

export const MainHeader = () => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="Pokemon Pichincha" />
          Pokemon Pichincha
        </NavLink>
      </nav>

      {/* <div className="navbar">
        <NavLink to="/">Home</NavLink>
      </div> */}
    </header>
  );
};
