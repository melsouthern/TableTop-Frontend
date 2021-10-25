import "../componentsCSS/login.css";
import peopleAccounts from "../signin.jpg";
import { useContext, useState } from "react";
import { getUsers } from "../utils/axios";
import { UserContext } from "../contexts/User";
import ProfilePage from "./ProfilePage";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);

  if (user) return <ProfilePage />;

  return (
    <section>
      <div className="LoginForm">
        <div className="PeopleImgContainer">
          <img
            className="PeopleImg"
            src={peopleAccounts}
            alt="people Img"
          ></img>
        </div>
        <div className="LoginText">
          <p>Log in</p>
        </div>
        <div>
          <form
            onSubmit={async (e) => {
              setError(null);
              e.preventDefault();
              if (!password || !username) {
                setError("All fields must be filled in");
                return;
              }
              setError(null);
              try {
                const userData = await getUsers(username);
                setUser(() => [
                  userData.name,
                  userData.username,
                  userData.avatar_url,
                ]);
              } catch (err) {
                setError("Username provided does not exist");
                return;
              }
            }}
          >
            <div className="Login">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Type 'jessjelly'"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  placeholder="Type a random password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="LoginButtonContainer">
                <button className="LoginButton">Submit</button>
              </div>
              <p className="SubmitError">{error}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
