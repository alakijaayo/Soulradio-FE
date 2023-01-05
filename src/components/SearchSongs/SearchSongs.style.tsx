import { Button, styled, TextField, Typography } from "@mui/material";

export const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTextField = styled(TextField)`
  margin-top: 30px;
  margin-bottom: 15px;
`;

export const SearchButton = styled(Button)``;

export const SongList = styled("div")`
  overflow: scroll;
  height: 100%;
  margin-top: 30px;
  height: 80vh;
  width: 85%;
`;

export const SongInfo = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
`;

export const SongTitle = styled(Typography)`
  text-align: center;
  font-size: 16px;
`;

export const ArtistName = styled(Typography)`
  text-align: center;
  font-size: 12px;
`;

export const TrackInfo = styled("div")`
  max-width: 220px;
  padding: 0px 15px;
`;
