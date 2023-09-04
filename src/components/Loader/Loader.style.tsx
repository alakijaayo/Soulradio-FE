import { Box, css, styled } from "@mui/material";

const position = css`
  left: 50%;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledBox = styled(Box)`
  ${position};
`;
