import { CircularProgress } from "@mui/material";
import { StyledBox } from "./Loader.style";

function Loader() {
  return (
    <StyledBox>
      <CircularProgress size={70} />
    </StyledBox>
  );
}

export default Loader;
