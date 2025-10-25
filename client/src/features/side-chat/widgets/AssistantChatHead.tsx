import { Avatar, Box, Typography } from "@mui/material";
import { format } from "date-fns";
import logo from "../../../../public/assistant-logo.png";

export type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: number | Date;
};

type Props = {
  message: Message;
};

const AssistantChatHead = ({ message }: Props) => {
  const isUser = message.role === "user";

  const time = message.timestamp
    ? format(new Date(message.timestamp), "hh:mm a")
    : format(new Date(), "hh:mm a");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexDirection: isUser ? "row-reverse" : "row",
      }}
    >
      {!isUser && <Avatar src={logo} alt="Assistant" />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
        }}
      >
        <Typography fontSize={13} fontWeight={600}>
          {isUser ? "You" : `Assistant`}
        </Typography>
        <Typography fontSize={10} color="grey">
          {time}
        </Typography>
      </Box>
    </Box>
  );
};

export default AssistantChatHead;
