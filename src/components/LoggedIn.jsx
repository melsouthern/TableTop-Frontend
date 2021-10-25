import { useContext } from "react";
import { UserContext } from "../contexts/User";

const LoggedIn = () => {
  const { user } = useContext(UserContext);

  if (user) {
    const userNameSplit = user[0].split(" ");

    return (
      <div className="LoggedIn">
        {" "}
        <p className="LoggedInText">
          Logged in as <u>{user[1]}</u>. Welcome back {userNameSplit[0]}!
        </p>
      </div>
    );
  } else return <p></p>;
};

export default LoggedIn;
