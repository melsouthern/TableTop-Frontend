import { UserContext } from "../contexts/User";
import { useContext } from "react";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  return <p>ProfilePage</p>;
};

export default ProfilePage;
