import notFound from "../404 error.jpg";
import "../componentsCSS/incorrectpath.css";

const IncorrectPath = () => {
  return (
    <section className="IncorrectPathPage">
      <img className="NotFoundImg" src={notFound} alt="page not found"></img>
      <p className="ErrorText">
        Oops! That page doesn't exist, try another path.
      </p>
    </section>
  );
};

export default IncorrectPath;
