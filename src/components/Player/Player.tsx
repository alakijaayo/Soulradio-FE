import { Grid, Typography } from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
import { StyledGrid, Text, TextGrid, Wrapper } from "./Player.style";

interface PlayerProps {
  accessToken: string;
  setDeviceID: Dispatch<React.SetStateAction<string>>;
}

function Player({ accessToken, setDeviceID }: PlayerProps) {
  const [current_track, setTrack] = useState<Spotify.Track | null>(null);

  useEffect(() => {
    if (accessToken !== "") {
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

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("ready", ({ device_id }) => {
          setDeviceID(device_id);
          console.log("Ready with Device ID", device_id);
          player.addListener("player_state_changed", (state) => {
            console.log(state);
          });
        });

        // player.addListener("ready", ({ device_id }) => {
        //   player.getCurrentState().then((state) => {
        //     if (!state) {
        //       fetch(`http://localhost:8080/play?device_id=${device_id}`, {
        //         method: "PUT",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       });
        //     }
        //   });
        // });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          setTrack(state.track_window.current_track);
          console.log(state.track_window.current_track);
        });

        player.connect().then((success) => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!"
            );
          }
        });
      };
    }
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
