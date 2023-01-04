import { Avatar } from "@mui/material";
import { User } from "../../models/user";
import LoginButton from "../LoginButton";
import { StyledHeader, StyledToolbar, Text } from "./Header.style";

interface HeaderProps {
  loggedIn: boolean;
  userData: User;
}

function Header({ loggedIn, userData }: HeaderProps) {
  const { userImage } = userData;
  return (
    <>
      <StyledHeader position="static">
        <StyledToolbar>
          {loggedIn ? <Avatar src={userImage}>AA</Avatar> : <Avatar>HI</Avatar>}
          <Text variant="h4">SoulRadio</Text>
          <LoginButton loggedIn={loggedIn}></LoginButton>
        </StyledToolbar>
      </StyledHeader>
    </>
  );
}

export default Header;
