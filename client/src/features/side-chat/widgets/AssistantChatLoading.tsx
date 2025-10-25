import { Box } from "@mui/material";
import animation from "../../../../public/typing-animation.gif";
import AssistantChatHead, { Message } from "./AssistantChatHead";

export const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "🌱 Hi there! I'm Luke, your AI assistant from FreshEarth. How can I help you today?",
    timestamp: new Date(),
  },
];

const AssistantChatLoading = () => {
  return (
    <Box
      sx={{
        mb: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <AssistantChatHead message={initialMessages[0]} />
      <Box
        sx={{
          mt: 0.5,
        }}
      >
        <img alt="loading" src={animation} width={50} />
      </Box>
    </Box>
  );
};

export default AssistantChatLoading;
