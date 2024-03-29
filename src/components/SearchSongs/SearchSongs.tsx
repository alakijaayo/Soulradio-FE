import { ChangeEvent, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Track, Tracks } from "../../models/TrackData";
import {
  ArtistName,
  SearchButton,
  SongInfo,
  SongList,
  SongTitle,
  StyledTextField,
  TrackInfo,
  Wrapper,
} from "./SearchSongs.style";

interface SearchSongsProps {
  url: string;
  sendQueueMessage: (
    value: string,
    track: number,
    vote: string,
    song: Tracks
  ) => void;
}

function SearchSongs({ url, sendQueueMessage }: SearchSongsProps) {
  const [trackName, setTrackName] = useState("");
  const [trackInfo, setTrackInfo] = useState<Tracks[]>([]);
  const URL = url + "/searchtrack?track=" + trackName;

  const searchTrack = async () => {
    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setTrackInfo([]);

        const trackArray: Tracks[] = [];
        response.items.forEach((track: Track) => {
          trackArray.push({
            name: track.name,
            artist: track.artists[0].name,
            uri: track.uri,
            image: track.album.images,
            duration: track.durationMs,
            id: track.id,
          });
        });
        setTrackInfo(trackArray);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackName(e.target.value);
  };

  return (
    <Wrapper>
      <StyledTextField
        variant="outlined"
        size="small"
        id="Search Songs"
        placeholder="Search Here"
        onChange={handleChange}
      />

      <SearchButton
        color="primary"
        variant="outlined"
        size="medium"
        onClick={() => searchTrack()}
      >
        Search
      </SearchButton>

      <SongList>
        {trackInfo.map((track, idx) => (
          <SongInfo key={`${track.artist} ${track.name} ${idx}`}>
            <img src={track.image[2].url} alt={track.name} />
            <TrackInfo>
              <SongTitle>{track.name}</SongTitle>
              <ArtistName>{track.artist}</ArtistName>
            </TrackInfo>
            <AddCircleIcon
              onClick={() => sendQueueMessage("QUEUE", 0, "", track)}
            />
          </SongInfo>
        ))}
      </SongList>
    </Wrapper>
  );
}

export default SearchSongs;
