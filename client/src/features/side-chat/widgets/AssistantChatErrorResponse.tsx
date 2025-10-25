import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Typography } from "@mui/material";
import AssistantChatHead, { Message } from "./AssistantChatHead";
export type AssistantError = {
  errorConnecting: boolean;
  errorResponding: boolean;
};

export const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "🌱 Hi there! I'm Luke, your AI assistant from FreshEarth. How can I help you today?",
    timestamp: new Date(),
  },
];

type Props = {
  error: AssistantError;
  handleResend: () => void;
};

const AssistantChatErrorResponse = ({ error, handleResend }: Props) => {
  const radius = "22px";

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
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Box
          sx={{
            ml: 1,
            mr: 0,
            mt: 0.5,
            p: 1.5,
            borderBottomRightRadius: radius,
            borderBottomLeftRadius: radius,
            borderTopRightRadius: radius,
            borderTopLeftRadius: 0,
            backgroundColor: "#F5F5F5",
            border: "1px solid red",
          }}
        >
          <Typography fontSize={14} color="red">
            {error.errorResponding
              ? "Error generating response."
              : error.errorConnecting
              ? "Error connecting to a service."
              : "An unkown error occurred."}
          </Typography>
        </Box>
        {error.errorResponding && (
          <ReplayIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={handleResend}
          />
        )}
      </Box>
    </Box>
  );
};
export default AssistantChatErrorResponse;
