import { Avatar } from "@mui/material";
import LoginButton from "../LoginButton";
import { StyledHeader, StyledToolbar, Text } from "./Header.style";

function Header() {
  return (
    <>
      <StyledHeader position="static">
        <StyledToolbar>
          <Avatar>HI</Avatar>
          <Text variant="h4">SoulRadio</Text>
          <LoginButton loggedIn="false"></LoginButton>
        </StyledToolbar>
      </StyledHeader>
    </>
  );
}

export default Header;
