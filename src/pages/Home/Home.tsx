import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Player from "../../components/Player/Player";
import SearchSongs from "../../components/SearchSongs";
import Layout from "../../layout";
import { User } from "../../models/user";
import { StyledGrid } from "./Home.style";

function Home() {
  const [userData, setUserData] = useState<User>({
    username: "",
    id: "",
    userImage: "",
  });
  const [accessToken, setAccessToken] = useState("");
  const [deviceID, setDeviceID] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/username")
      .then((response) => response.json())
      .then((response) =>
        setUserData({
          username: response.displayName,
          id: response.id,
          userImage: response.images[0].url,
        })
      );

    fetch("http://localhost:8080/token")
      .then((response) => response.json())
      .then((response) => setAccessToken(response.token));
  }, []);

  return (
    <Layout userImage={userData.userImage}>
      <StyledGrid container>
        <Grid item md={3}>
          <SearchSongs deviceID={deviceID} />
        </Grid>
        <Grid item md={6}>
          <Player accessToken={accessToken} setDeviceID={setDeviceID} />
          <h1>testing</h1>
        </Grid>
        <Grid item md={3}>
          <h1>checking</h1>
        </Grid>
      </StyledGrid>
    </Layout>
  );
}

export default Home;
