import { Typography } from "@mui/material";
import { HomeWrapper } from "./Frontpage.style";

interface FrontpageProps {
  loggedIn: string;
  // userName: string;
  // accessToken: string;
}

function FrontPage({ loggedIn }: FrontpageProps) {
  return (
    <>
      {loggedIn === "true" ? (
        <h1>Hello</h1>
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
