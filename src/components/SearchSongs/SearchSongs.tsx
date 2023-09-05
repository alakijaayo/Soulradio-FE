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
  setTrack: Dispatch<React.SetStateAction<Tracks | null>>;
}

function SearchSongs({
  deviceID,
  setQueuedTracks,
  setTrack,
}: SearchSongsProps) {
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

  const queueTrack = async (track: Tracks) => {
    const playURL = `http://localhost:8080/queuetrack?device_id=${deviceID}`;
    fetch(playURL, {
      method: "PUT",
      body: JSON.stringify({
        name: track.name,
        artist: track.artist,
        image: track.image,
        uri: [track.uri],
        votesUp: 0,
        votesDown: 0,
        duration: track.duration,
        id: track.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setQueuedTracks(response);
        console.log(response.length);

        if (response.length === 0) {
          const { name, artist, uri, image, duration, id } = track;
          setTrack({
            name,
            artist,
            uri,
            image,
            duration,
            id,
          });
        }
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
            <AddCircleIcon onClick={() => queueTrack(track)} />
          </SongInfo>
        ))}
      </SongList>
    </Wrapper>
  );
}

export default SearchSongs;
