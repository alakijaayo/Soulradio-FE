import { useEffect, useState } from "react";
import Header from "./components/Header";
import { User } from "./models/user";
import Frontpage from "./pages/Frontpage";

function App() {
  const query = window.location.search;
  const loggedIn = query.replace("?userLoggedIn=", "");
  const isLoggedIn = loggedIn === "true";
  const [userData, setUserData] = useState<User>({
    username: "",
    id: "",
    userImage: "",
  });

  useEffect(() => {
    getUserData();
  }, [isLoggedIn]);

  const getUserData = () => {
    fetch("http://localhost:8080/username")
      .then((response) => response.json())
      .then((response) =>
        setUserData({
          username: response.displayName,
          id: response.id,
          userImage: response.images[0].url,
        })
      );
  };

  return (
    <>
      <Header loggedIn={isLoggedIn} userData={userData} />
      <Frontpage loggedIn={isLoggedIn} />
    </>
  );
}

export default App;
