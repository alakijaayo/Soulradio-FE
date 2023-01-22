import { Grid, styled, Typography } from "@mui/material";

export const Wrapper = styled("div")`
  margin: 2rem;
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
