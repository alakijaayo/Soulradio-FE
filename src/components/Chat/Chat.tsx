import {
  Bubble,
  ChatBox,
  StyledTextField,
  TextBox,
  Wrapper,
  Text,
  Name,
  Messages,
} from "./Chat.style";
import { Avatar, Button } from "@mui/material";
import { ChangeEvent } from "react";
import { Message } from "../../models/Message";

interface ChatProps {
  message: string;
  sendMessage: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  receivedMessages: Message[];
  username: string;
}

function Chat({
  message,
  sendMessage,
  setMessage,
  receivedMessages,
  username,
}: ChatProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Wrapper>
      <TextBox>
        <StyledTextField
          variant="outlined"
          id="Text Messenger"
          multiline
          rows={2}
          placeholder="Enter Message Here"
          onChange={handleChange}
          value={message}
        />
        <Button
          color="primary"
          variant="outlined"
          size="medium"
          onClick={sendMessage}
        >
          Send
        </Button>
      </TextBox>
      {receivedMessages.map(({ name, image, message }, idx) => {
        const isUser = name === username;

        return (
          <ChatBox key={`${name}-${idx}`}>
            {isUser ? <Avatar src={image} /> : null}
            <Bubble isUser={isUser}>
              <Text>
                <Name user={`${isUser}`}>{isUser ? "You" : name}</Name>
                <Messages>{message}</Messages>
              </Text>
            </Bubble>
            {isUser ? null : <Avatar src={image} />}
          </ChatBox>
        );
      })}
    </Wrapper>
  );
}

export default Chat;
