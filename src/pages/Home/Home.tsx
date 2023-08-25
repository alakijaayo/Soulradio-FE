import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Player from "../../components/Player/Player";
import Queue from "../../components/Queue";
import SearchSongs from "../../components/SearchSongs";
import Layout from "../../layout";
import { QueuedTracks } from "../../models/TrackData";
import { User } from "../../models/user";
import { StyledGrid } from "./Home.style";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const SOCKET_URL = "http://localhost:8080/ws-message";

function Home() {
  const [userData, setUserData] = useState<User>({
    username: "",
    id: "",
    userImage: "",
  });
  const [queuedTracks, setQueuedTracks] = useState<QueuedTracks[]>([]);
  const [accessToken, setAccessToken] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [message, setMessage] = useState("Your Message Shows Here");
  const socket = new SockJS(SOCKET_URL);
  const stompClient = Stomp.over(socket);

  const onConnected = () => {
    console.log("Connected!!");
    stompClient.subscribe("/topic/user", onMessageReceived);
  };

  const sendMessage = () => {
    if (stompClient) {
      let chatMessage = {
        name: "ayodele alakija",
        message: "Testing message",
      };
      stompClient.send("/app/topic-message", {}, JSON.stringify(chatMessage));
    }
  };

  const onMessageReceived = (msg: any) => {
    console.log("Message Received");
    const message = JSON.parse(msg.body);
    console.log(message.name);
    setMessage(message.message);
  };

  useEffect(() => {
    stompClient.connect({}, onConnected);
    fetch("http://localhost:8080/username")
      .then((response) => response.json())
      .then((response) =>
        setUserData({
          username: response.displayName,
          id: response.id,
          userImage: response.images[0].url,
        })
      );

    fetch("http://localhost:8080/token")
      .then((response) => response.json())
      .then((response) => setAccessToken(response.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout userImage={userData.userImage}>
      <StyledGrid container>
        <Grid item md={3}>
          <SearchSongs deviceID={deviceID} setQueuedTracks={setQueuedTracks} />
        </Grid>
        <Grid item md={6}>
          <Player
            accessToken={accessToken}
            setDeviceID={setDeviceID}
            setQueuedTracks={setQueuedTracks}
          />
          <div>{message}</div>
          <button onClick={sendMessage}>click</button>
        </Grid>
        <Grid item md={3}>
          <Queue
            queuedTracks={queuedTracks}
            setQueuedTracks={setQueuedTracks}
          />
        </Grid>
      </StyledGrid>
    </Layout>
  );
}

export default Home;
