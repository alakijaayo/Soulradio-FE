import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Player from "../../components/Player/Player";
import Queue from "../../components/Queue";
import SearchSongs from "../../components/SearchSongs";
import Layout from "../../layout";
import { QueuedTracks, Tracks } from "../../models/TrackData";
import { User, Users } from "../../models/user";
import { StyledGrid } from "./Home.style";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Chat from "../../components/Chat/Chat";
import { Message } from "../../models/Message";
import Loader from "../../components/Loader/Loader";

const inProduction = process.env.NODE_ENV === "production";
const url = inProduction
  ? "https://api.soulradiovibe.com"
  : "http://localhost:8080";
const SOCKET_URL = url + "/soulradio";

function Home() {
  const [userData, setUserData] = useState<User | null>(null);
  const [queuedTracks, setQueuedTracks] = useState<QueuedTracks[]>([]);
  const [accessToken, setAccessToken] = useState("");
  const [deviceID, setDeviceID] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<Users | null>(null);
  const [currentTrack, setTrack] = useState<Tracks | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const socket = new SockJS(SOCKET_URL);
  const stompClient = Stomp.over(socket);

  const sendMessage = (
    value: string,
    track?: number,
    vote?: string,
    song?: Tracks
  ) => {
    if (stompClient) {
      let messageSent = {};
      switch (value) {
        case "CHAT":
          messageSent = {
            name: userData?.username,
            image: userData?.userImage,
            message: message,
          };
          stompClient.send("/app/sendmessage", {}, JSON.stringify(messageSent));
          setMessage("");
          break;
        case "VOTE":
          messageSent = {
            trackNumber: track,
            vote: vote,
          };
          stompClient.send("/app/votes", {}, JSON.stringify(messageSent));
          break;
        case "QUEUE":
          messageSent = {
            device: deviceID,
            track: {
              name: song?.name,
              artist: song?.artist,
              image: song?.image,
              uri: [song?.uri],
              votesUp: 0,
              votesDown: 0,
              duration: song?.duration,
              id: song?.id,
              username: userData?.username.split(" ").slice(0, -1).join(" "),
            },
          };
          stompClient.send("/app/queuetrack", {}, JSON.stringify(messageSent));
          if (currentTrack === null && song) {
            const { name, artist, uri, image, duration, id } = song;
            setTrack({
              name,
              artist,
              uri,
              image,
              duration: duration + 80,
              id,
            });
          }
          break;
        case "NEXTTRACK":
          stompClient.send("/app/getnexttrack", {});
          break;
        case "PLAY":
          stompClient.send("/app/play", {});
          break;
        case "LOGGEDIN":
          messageSent = {
            name: userData?.username,
          };
          stompClient.send("/app/loggedin", {}, JSON.stringify(messageSent));
      }
    }
  };

  const onMessageReceived = (msg: any) => {
    console.log("Message Received");
    const receivedMessage = JSON.parse(msg.body);
    setReceivedMessages((prevState) => [...prevState, receivedMessage]);
  };

  const onVoteReceived = (msg: any) => {
    console.log("Vote Received");
    const voteReceived = JSON.parse(msg.body);
    setQueuedTracks(voteReceived);
  };

  const onQueueReceived = (msg: any) => {
    console.log("Queue Received");
    const queueMessage = JSON.parse(msg.body);
    if (queueMessage[0]) setQueuedTracks(queueMessage);
  };

  const onNextTrackReceived = (msg: any) => {
    console.log("Next Track Received");
    const nextTrackMessage = JSON.parse(msg.body);
    const { name, artist, uri, image, duration, id, message } =
      nextTrackMessage;
    if (message) {
      setTrack(null);
    } else {
      setTrack({
        name,
        artist,
        uri,
        image,
        duration: duration + 80,
        id,
      });
    }
  };

  const onPlayReceived = (msg: any) => {
    console.log("Play Received");
    const playMessage = JSON.parse(msg.body);
    setQueuedTracks(playMessage);
  };

  const onLoggedInReceived = (msg: any) => {
    const loggedInMessage = JSON.parse(msg.body);
    setUsers(loggedInMessage);
  };

  useEffect(() => {
    fetch(url + "/username")
      .then((response) => response.json())
      .then((response) =>
        setUserData({
          username: response.displayName,
          id: response.id,
          userImage: response.images[0].url,
        })
      );

    const onConnected = () => {
      stompClient.subscribe("/topic/messages", onMessageReceived);
      stompClient.subscribe("/topic/votes", onVoteReceived);
      stompClient.subscribe("/topic/queue", onQueueReceived);
      stompClient.subscribe("/topic/nexttrack", onNextTrackReceived);
      stompClient.subscribe("/topic/play", onPlayReceived);
      stompClient.subscribe("/topic/loggedin", onLoggedInReceived);
      console.log("Connected!!");
    };

    stompClient.connect({}, onConnected);
    stompClient.debug = () => {};

    fetch(url + "/token")
      .then((response) => response.json())
      .then((response) => setAccessToken(response.token));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData) {
      setTimeout(() => sendMessage("LOGGEDIN"), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  if (accessToken === "") {
    return <Loader />;
  }

  return (
    <Layout userImage={userData?.userImage}>
      <StyledGrid container>
        <Grid item md={3}>
          <SearchSongs sendQueueMessage={sendMessage} url={url} />
        </Grid>
        <Grid item md={6} container direction="column">
          <Grid item>
            <Player
              accessToken={accessToken}
              setDeviceID={setDeviceID}
              setPlayerMessage={sendMessage}
              currentTrack={currentTrack}
            />
          </Grid>
          <Grid alignItems="center">
            <Chat
              message={message}
              sendChatMessage={sendMessage}
              setMessage={setMessage}
              receivedMessages={receivedMessages}
              username={userData?.username}
            />
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Queue sendVoteMessage={sendMessage} queuedTracks={queuedTracks} />
        </Grid>
      </StyledGrid>
    </Layout>
  );
}

export default Home;
