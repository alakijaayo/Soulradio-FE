import { Button } from "@mui/material";

interface LoginButtonProps {
  loggedIn: boolean;
}

function LoginButton({ loggedIn }: LoginButtonProps) {
  if (loggedIn) {
    return (
      <Button color="inherit" variant="outlined" href="/">
        Logout
      </Button>
    );
  }

  return (
    <Button
      color="inherit"
      variant="outlined"
      href="http://localhost:8080/login"
    >
      Login
    </Button>
  );
}

// { loggedIn, login, logout }: LoginButtonProps

export default LoginButton;
