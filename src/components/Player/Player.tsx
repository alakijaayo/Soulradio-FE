import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyledGrid, Text, TextGrid, Wrapper } from "./Player.style";
import { QueuedTracks, Track } from "../../models/TrackData";

interface PlayerProps {
  accessToken: string;
  setDeviceID: Dispatch<SetStateAction<string>>;
  setQueuedTracks: Dispatch<SetStateAction<QueuedTracks[]>>;
}

function Player({ accessToken, setDeviceID, setQueuedTracks }: PlayerProps) {
  const [current_track, setTrack] = useState<Track | null>(null);

  const playNextTrack = () => {
    console.log("song ended");

    fetch("http://localhost:8080/play", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setQueuedTracks(response));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("creating player");

      const player = new window.Spotify.Player({
        name: "SoulRadio",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });

      player.activateElement();

      player.addListener("ready", ({ device_id }) => {
        setDeviceID(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        const { track_window, timestamp } = state;
        const { current_track } = track_window;
        setTrack({
          name: current_track.name,
          artists: current_track.artists,
          uri: current_track.uri,
          album: current_track.album,
          durationMs: current_track.duration_ms,
          id: current_track.id,
          timestamp,
        });

        if (state.duration === state.position) {
          console.log("hello");
        }
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
    };
  }, [accessToken, setDeviceID]);

  return (
    <Wrapper>
      <StyledGrid container>
        <Grid item md={6}>
          <img src={current_track?.album.images[0].url} alt="Now Playing" />
        </Grid>
        <TextGrid item md={6}>
          <Text variant="h5">Currently Playing</Text>
          <Typography variant="h5" gutterBottom>
            {current_track?.name ? current_track.name : "Nothing to play!"}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {current_track?.artists[0].name
              ? current_track.artists[0].name
              : "Add a track to the queue"}
          </Typography>
        </TextGrid>
      </StyledGrid>
    </Wrapper>
  );
}

export default Player;
