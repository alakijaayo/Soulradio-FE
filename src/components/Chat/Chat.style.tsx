import { styled, TextField, Box, Typography } from "@mui/material";

interface MessageProps {
  isUser: boolean;
}

export const Wrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const TextBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export const ChatBox = styled(Box)`
  padding: 20px 30px;
  display: flex;
  align-items: center;
  overflow: scroll;
`;

export const StyledTextField = styled(TextField)`
  width: 500px;
  margin-right: 1.5rem;
`;

export const Bubble = styled("div")<MessageProps>`
  width: 600px;
  height: auto;
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: 2px 4px 3px #000;
  position: relative;
  margin-right: 1rem;
  ${({ isUser }) => isUser && `margin-left: 1rem; margin-right: 0`}
`;

export const Text = styled("div")`
  padding: 5px;
`;

export const Name = styled(Typography)<MessageProps>`
  font-weight: 600;
  font-size: 12px;
  margin: 0 0 4px;
  color: ${({ isUser }) => (isUser ? `#3498db` : `#2ecc71`)};
`;

export const Messages = styled(Typography)`
  font-size: 12px;
  margin: 0;
  color: #2b2b2b;
`;

export const Arrow = styled("span")`
  position: absolute;
  width: 0;
  bottom: 42px;
  left: -16px;
  height: 0;
`;
