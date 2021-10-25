import { UserContext } from "../contexts/User";
import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/axios";
import { useHistory } from "react-router-dom";
import "../componentsCSS/profilepage.css";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const userNameSplit = user[0].split(" ");
  const [profilePicture, setProfilePicture] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getUsers(user[1]).then((userInfo) => {
      setProfilePicture(userInfo.avatar_url);
    });
  }, [setProfilePicture, profilePicture, user]);

  return (
    <section className="ProfilePage">
      <div className="ProfilePicContainer">
        <img className="ProfilePic" src={profilePicture} alt="profile"></img>
      </div>
      <div className="WelcomeMessage">
        <p>
          Welcome back <br></br>{" "}
          <span className="UsernameStyling">{userNameSplit[0]}</span>
        </p>
      </div>
      <div className="LogOutButtonContainer">
        <button
          className="LogOutButton"
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
            setUser(null);
          }}
        >
          Log Out
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;
