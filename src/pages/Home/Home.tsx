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
import Chat from "../../components/Chat/Chat";
import { Message } from "../../models/Message";

const SOCKET_URL = "http://localhost:8080/soulradio";

function Home() {
  const [userData, setUserData] = useState<User>({
    username: "",
    id: "",
    userImage: "",
  });
  const [queuedTracks, setQueuedTracks] = useState<QueuedTracks[]>([]);
  const [accessToken, setAccessToken] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const socket = new SockJS(SOCKET_URL);
  const stompClient = Stomp.over(socket);

  const onConnected = () => {
    console.log("Connected!!");
    stompClient.subscribe("/topic/messages", onMessageReceived);
  };

  const sendMessage = () => {
    if (stompClient) {
      let chatMessage = {
        name: userData.username,
        image: userData.userImage,
        message: message,
      };
      stompClient.send("/app/sendmessage", {}, JSON.stringify(chatMessage));
      setMessage("");
    }
  };

  const onMessageReceived = (msg: any) => {
    console.log("Message Received");
    const receivedMessage = JSON.parse(msg.body);
    setReceivedMessages((prevState) => [...prevState, receivedMessage]);
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
        <Grid item md={6} container direction="column">
          <Grid item>
            <Player
              accessToken={accessToken}
              setDeviceID={setDeviceID}
              setQueuedTracks={setQueuedTracks}
            />
          </Grid>
          <Grid alignItems="center">
            <Chat
              message={message}
              sendMessage={sendMessage}
              setMessage={setMessage}
              receivedMessages={receivedMessages}
              username={userData.username}
            />
          </Grid>
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
