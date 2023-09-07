import { Grid, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { StyledGrid, Text, TextGrid, Wrapper } from "./Player.style";
import { Tracks } from "../../models/TrackData";

interface PlayerProps {
  accessToken: string;
  setDeviceID: Dispatch<SetStateAction<string>>;
  setPlayerMessage: (value: string) => void;
  currentTrack: Tracks | null;
}

function Player({
  accessToken,
  setDeviceID,
  setPlayerMessage,
  currentTrack,
}: PlayerProps) {
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

      player.addListener("ready", ({ device_id }) => {
        setDeviceID(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    };
  }, [accessToken, setDeviceID]);

  useEffect(() => {
    const playNextTrack = () => {
      console.log("song ended");
      setPlayerMessage("NEXTTRACK");
      setPlayerMessage("PLAY");
    };

    if (currentTrack) {
      setTimeout(playNextTrack, currentTrack.duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  return (
    <Wrapper>
      <StyledGrid container>
        <Grid item md={6}>
          <img src={currentTrack?.image[1].url} alt="Now Playing" />
        </Grid>
        <TextGrid item md={6}>
          <Text variant="h5">Currently Playing</Text>
          <Typography variant="h5" gutterBottom>
            {currentTrack?.name ? currentTrack.name : "Nothing to play!"}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {currentTrack?.artist
              ? currentTrack.artist
              : "Add a track to the queue"}
          </Typography>
        </TextGrid>
      </StyledGrid>
    </Wrapper>
  );
}

export default Player;
