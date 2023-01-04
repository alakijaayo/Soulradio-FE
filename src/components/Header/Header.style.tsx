import { AppBar, styled, Toolbar, Typography } from "@mui/material";

export const StyledHeader = styled(AppBar)`
  background: red;
`;

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled(Typography)`
  font-weight: 800;
  font-size: 28px;

  ${({ theme }) => theme.breakpoints.up("md")} {
    font-size: 34px;
  }
`;

export const StyledImage = styled("img")`
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #cccccc;
`;
