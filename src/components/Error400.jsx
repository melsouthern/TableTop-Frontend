import error400 from "../400 error.jpg";
import "../componentsCSS/badrequest.css";

const Error400 = (error) => {
  return (
    <section className="Error400Page">
      <img className="Error400Img" src={error400} alt="bad request"></img>
      <p className="Error400Text">
        Oops! Something went wrong... <br></br> {error.msg}
      </p>
    </section>
  );
};

export default Error400;
