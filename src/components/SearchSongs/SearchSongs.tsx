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

function SearchSongs() {
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
            trackDuraction: track.durationMs,
            trackId: track.id,
          });
        });
        setTrackInfo(trackArray);
      });
  };

  const playTrack = async (id: string) => {
    const playURL = "http://localhost:8080/play?trackid=" + id;
    fetch(playURL);
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
            <AddCircleIcon onClick={() => playTrack(track.trackuri)} />
          </SongInfo>
        ))}
      </SongList>
    </Wrapper>
  );
}

export default SearchSongs;
