import { QueuedTracks } from "../../models/TrackData";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {
  ArtistName,
  QueuedTracksInfo,
  QueueList,
  SongTitle,
  TrackInfo,
  Votes,
} from "./Queue.style";

interface QueueProps {
  queuedTracks: QueuedTracks[];
}

function Queue({ queuedTracks }: QueueProps) {
  return (
    <>
      <h1>Up Next</h1>
      <h3>Vote on your favourite track!</h3>

      <QueueList>
        {queuedTracks.map((track, idx) => (
          <QueuedTracksInfo key={`${track.artist} ${track.name} ${idx}`}>
            <img src={track.image} alt={track.name} />
            <TrackInfo>
              <SongTitle>{track.name}</SongTitle>
              <ArtistName>{track.artist}</ArtistName>
            </TrackInfo>
            <Votes>
              <ThumbUpAltIcon />
              <ThumbDownAltIcon />
            </Votes>
          </QueuedTracksInfo>
        ))}
      </QueueList>
    </>
  );
}

export default Queue;
