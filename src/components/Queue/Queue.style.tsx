import { IconButton, styled, Typography, css } from "@mui/material";

interface ColorProps {
  active: string;
}

export const QueueList = styled("div")`
  overflow: scroll;
  margin: 0 1rem;
`;

export const QueuedTracksInfo = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
`;

export const Votes = styled("div")`
  min-width: 80px;
`;

export const TrackInfo = styled("div")`
  padding: 0px 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const SongTitle = styled(Typography)`
  text-align: center;
  font-size: 14px;
`;

export const ArtistName = styled(Typography)`
  text-align: center;
  font-size: 12px;
`;

export const VotesCount = styled(Typography)`
  text-align: center;
  font-size: 12px;
`;

export const UserName = styled(Typography)`
  text-align: center;
  font-size: 12px;
`;

export const Text = styled(Typography)`
  font-size: 30px;
  font-weight: 600;
`;

export const Subtitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
`;

export const VoteUpButton = styled(IconButton)<ColorProps>`
  svg {
    color: black;

    ${({ active }) =>
      active === "1" &&
      css`
        color: green;
      `}
  }
`;

export const VoteDownButton = styled(IconButton)<ColorProps>`
  svg {
    color: black;

    ${({ active }) =>
      active === "1" &&
      css`
        color: red;
      `}
  }
`;
