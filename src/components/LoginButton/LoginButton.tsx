import { Button } from "@mui/material";

interface LoginButtonProps {
  loggedIn: boolean;
}

const inProduction = process.env.NODE_ENV === "production";
const url = inProduction
  ? "https://api.soulradiovibe.com"
  : "http://localhost:8080";

function LoginButton({ loggedIn }: LoginButtonProps) {
  if (loggedIn) {
    return (
      <Button color="inherit" variant="outlined" href="/">
        Logout
      </Button>
    );
  }

  return (
    <Button color="inherit" variant="outlined" href={url + "/login"}>
      Login
    </Button>
  );
}

export default LoginButton;
