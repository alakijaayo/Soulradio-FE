import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { QueuedTracks, Track, Tracks } from "../../models/TrackData";
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
  deviceID: string;
  setQueuedTracks: Dispatch<SetStateAction<QueuedTracks[]>>;
}

function SearchSongs({ deviceID, setQueuedTracks }: SearchSongsProps) {
  const [trackName, setTrackName] = useState("");
  const [trackInfo, setTrackInfo] = useState<Tracks[]>([]);
  const URL = "http://localhost:8080/searchtrack?track=" + trackName;

  const searchTrack = async () => {
    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setTrackInfo([]);

        const trackArray: Tracks[] = [];
        response.items.forEach((track: Track) => {
          trackArray.push({
            trackName: track.name,
            trackArtist: track.artists[0].name,
            trackuri: track.uri,
            trackImage: track.album.images,
            trackDuration: track.durationMs,
            trackId: track.id,
          });
        });
        setTrackInfo(trackArray);
      });
  };

  const playTrack = async (track: Tracks) => {
    const playURL = `http://localhost:8080/queuetrack?device_id=${deviceID}`;
    fetch(playURL, {
      method: "PUT",
      body: JSON.stringify({
        name: track.trackName,
        artist: track.trackArtist,
        image: track.trackImage[2].url,
        uri: [track.trackuri],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setQueuedTracks(response));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackName(e.target.value);
  };

  return (
    <Wrapper>
      <StyledTextField
        variant="outlined"
        size="small"
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
          <SongInfo key={`${track.trackArtist} ${track.trackName} ${idx}`}>
            <img src={track.trackImage[2].url} alt={track.trackName} />
            <TrackInfo>
              <SongTitle>{track.trackName}</SongTitle>
              <ArtistName>{track.trackArtist}</ArtistName>
            </TrackInfo>
            <AddCircleIcon onClick={() => playTrack(track)} />
          </SongInfo>
        ))}
      </SongList>
    </Wrapper>
  );
}

export default SearchSongs;
