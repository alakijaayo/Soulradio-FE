import { Button } from "@mui/material";

interface LoginButtonProps {
  loggedIn: string;
  // login: string;
  // logout: string;
}

function LoginButton({ loggedIn }: LoginButtonProps) {
  if (loggedIn === "true") {
    return (
      <Button color="inherit" variant="outlined" href="/">
        Logout
      </Button>
    );
  }

  return (
    <Button color="inherit" variant="outlined" href="/">
      Login
    </Button>
  );
}

// { loggedIn, login, logout }: LoginButtonProps

export default LoginButton;
