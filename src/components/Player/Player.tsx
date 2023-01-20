import { Dispatch, useEffect } from "react";

interface PlayerProps {
  accessToken: string;
  setDeviceID: Dispatch<React.SetStateAction<string>>;
}

function Player({ accessToken, setDeviceID }: PlayerProps) {
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
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          console.log(state);
        });

        player.connect();
        player
          .getCurrentState()
          .then((response) => console.log(response?.context));
      };
    }
  }, [accessToken, setDeviceID]);

  return <h1>Hello World</h1>;
}

export default Player;
