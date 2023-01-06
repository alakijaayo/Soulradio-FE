import { Avatar } from "@mui/material";
import LoginButton from "../LoginButton";
import { StyledHeader, StyledToolbar, Text } from "./Header.style";

interface HeaderProps {
  userImage?: string;
}

function Header({ userImage }: HeaderProps) {
  const query = window.location.pathname;
  const loggedIn = query === "/home";

  return (
    <>
      <StyledHeader position="static">
        <StyledToolbar>
          {loggedIn ? <Avatar src={userImage}>AA</Avatar> : <Avatar>HI</Avatar>}
          <Text variant="h4">SoulRadio</Text>
          <LoginButton loggedIn={loggedIn} />
        </StyledToolbar>
      </StyledHeader>
    </>
  );
}

export default Header;
