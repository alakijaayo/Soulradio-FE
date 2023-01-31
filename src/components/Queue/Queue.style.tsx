import { styled, Typography } from "@mui/material";

export const QueueList = styled("div")`
  overflow: scroll;
  height: 100%;
  margin-top: 30px;
  height: 80vh;
  width: 95%;
`;

export const QueuedTracksInfo = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
`;

export const Votes = styled("div")``;

export const TrackInfo = styled("div")`
  padding: 0px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const SongTitle = styled(Typography)`
  text-align: center;
  font-size: 16px;
`;

export const ArtistName = styled(Typography)`
  text-align: center;
  font-size: 12px;
`;
