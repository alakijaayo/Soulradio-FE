import { styled, TextField, Box, Typography } from "@mui/material";

interface MessageProps {
  isUser: boolean;
}
interface ColorProps {
  user: string;
}

const textColor: Record<string, string> = {
  true: `#3498db`,
  false: `#2ecc71`,
};

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 480px;
  overflow: scroll;
`;

export const TextBox = styled(Box)`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

export const ChatBox = styled(Box)`
  padding: 20px 30px;
  display: flex;
  align-items: center;
`;

export const StyledTextField = styled(TextField)`
  width: 500px;
  margin-right: 1.5rem;
`;

export const Bubble = styled("div")<MessageProps>`
  width: 500px;
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

export const Name = styled(Typography)<ColorProps>`
  font-weight: 600;
  font-size: 12px;
  margin: 0 0 4px;
  color: ${({ user }) => textColor[user]};
`;

export const Messages = styled(Typography)`
  font-size: 12px;
  margin: 0;
  color: #2b2b2b;
`;
