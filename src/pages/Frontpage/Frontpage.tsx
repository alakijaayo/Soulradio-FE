import { Typography } from "@mui/material";
import Layout from "../../layout";
import { StyledBox } from "./Frontpage.style";

function FrontPage() {
  return (
    <Layout>
      <StyledBox>
        <Typography variant="h2" align="center">
          Welcome To SoulRadio
        </Typography>
        <Typography variant="h3" align="center">
          Login to enjoy the full experience
        </Typography>
      </StyledBox>
    </Layout>
  );
}

export default FrontPage;
