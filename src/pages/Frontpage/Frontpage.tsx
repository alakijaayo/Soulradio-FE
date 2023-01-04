import { Grid, Typography } from "@mui/material";
import { HomeWrapper, StyledGrid } from "./Frontpage.style";

interface FrontpageProps {
  loggedIn: boolean;
}

function FrontPage({ loggedIn }: FrontpageProps) {
  return (
    <>
      {loggedIn ? (
        <StyledGrid container>
          <Grid item md={3}>
            <h1>check</h1>
          </Grid>
          <Grid item md={6}>
            <h1>test</h1>
            <h1>testing</h1>
          </Grid>
          <Grid item md={3}>
            <h1>checking</h1>
          </Grid>
        </StyledGrid>
      ) : (
        <HomeWrapper>
          <Typography variant="h2" align="center">
            Welcome To SoulRadio
          </Typography>
          <Typography variant="h3" align="center">
            Login to enjoy the full experience
          </Typography>
        </HomeWrapper>
      )}
    </>
  );
}

export default FrontPage;
