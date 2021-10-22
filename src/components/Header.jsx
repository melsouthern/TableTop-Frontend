import "../componentsCSS/header.css";
import dice from "../dice.png";
import home from "../home.png";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <section className="Header">
      <span>
        <img
          className="DiceImg"
          src={dice}
          alt="dice"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/`);
          }}
        ></img>
        <p
          className="LogoText"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/`);
          }}
        >
          TableTop{" "}
        </p>
        ;
        <img
          className="HomeImg"
          src={home}
          alt="home"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/`);
          }}
        ></img>
      </span>
    </section>
  );
};

export default Header;
