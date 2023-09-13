import { Button, Grid, styled, Typography } from "@mui/material";

export const Wrapper = styled("div")`
  min-height: 320px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
`;

export const Text = styled(Typography)`
  font-weight: 800;
  margin-bottom: 1rem;
`;

export const StyledGrid = styled(Grid)`
  display: flex;
  text-align: center;
`;

export const TextGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SkipButton = styled(Button)`
  color: red;
  border: 1px solid red;

  &:hover {
    background: transparent;
    border: 1px solid red;
  }
`;
