import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
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
  });
  return (
    <Layout userImage={userData.userImage}>
      <StyledGrid container>
        <Grid item md={3}>
          <SearchSongs />
        </Grid>
        <Grid item md={6}>
          <h1>test</h1>
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
