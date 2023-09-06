import { QueuedTracks } from "../../models/TrackData";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {
  ArtistName,
  QueuedTracksInfo,
  QueueList,
  SongTitle,
  Subtitle,
  Text,
  TrackInfo,
  VoteDownButton,
  Votes,
  VotesCount,
  VoteUpButton,
} from "./Queue.style";
import { Dispatch, SetStateAction } from "react";

interface QueueProps {
  queuedTracks: QueuedTracks[];
  setQueuedTracks: Dispatch<SetStateAction<QueuedTracks[]>>;
  sendVote: (value: string, track: number, vote: string) => void;
}

function Queue({ queuedTracks, setQueuedTracks, sendVote }: QueueProps) {
  return (
    <QueueList>
      <Text>Up Next</Text>
      <Subtitle>Vote on your favourite track!</Subtitle>

      {queuedTracks.map((track, idx) => (
        <QueuedTracksInfo key={`${track.artist} ${track.name} ${idx}`}>
          <img src={track.image[2].url} alt={track.name} />
          <TrackInfo>
            <SongTitle>{track.name}</SongTitle>
            <ArtistName>{track.artist}</ArtistName>
            <VotesCount>Votes: {track.votesUp - track.votesDown}</VotesCount>
          </TrackInfo>
          <Votes>
            <VoteUpButton
              disableRipple
              disabled={track.votesUp === 1 || track.votesDown === 1}
              active={track.votesUp.toString()}
              onClick={() => sendVote("VOTE", idx, "up")}
            >
              <ThumbUpAltIcon />
            </VoteUpButton>
            <VoteDownButton
              disableRipple
              disabled={track.votesUp === 1 || track.votesDown === 1}
              active={track.votesDown.toString()}
              onClick={() => sendVote("VOTE", idx, "down")}
            >
              <ThumbDownAltIcon />
            </VoteDownButton>
          </Votes>
        </QueuedTracksInfo>
      ))}
    </QueueList>
  );
}

export default Queue;
