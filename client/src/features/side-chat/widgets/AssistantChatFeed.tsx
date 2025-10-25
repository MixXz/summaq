import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import logo from "../../../../public/assistant-logo.png";
import AssistantChatMessage from "./AssistantChatMessage";

type Msg = { role: "user" | "assistant"; content: string };

type Props = {
  isSideChat?: boolean;
  messages: Msg[];
  loading: boolean;
  error: string;
};

const AssistantChatFeed = ({
  isSideChat = true,
  messages,
  loading,
  error,
}: Props) => {
  const showEmpty = !loading && !error && messages.length === 0;

  return (
    <Box
      sx={{
        mt: isSideChat ? 3 : 0,
        padding: isSideChat ? 0 : 4,
        px: isSideChat ? 2 : 4,
        width: isSideChat ? "30rem" : "100%",
        height: isSideChat ? "90vh" : "81vh",
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "auto",
        position: "relative",
      }}
      className="hide-scrollbar"
    >
      {/* Empty state */}
      {showEmpty && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src={logo} sx={{ width: 150, height: 150 }} />
          <Typography fontSize={24} fontWeight={600} color="#696969">
            Hi, how can I help?
          </Typography>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Box
          sx={{
            mb: 1,
            background: "#fdecec",
            color: "#b00020",
            p: 1.5,
            borderRadius: 1,
          }}
        >
          {error}
        </Box>
      )}

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <CircularProgress size={24} color="inherit" />
        </Box>
      )}

      {/* Messages (newest at top because column-reverse) */}
      {messages.map((m) => (
        <AssistantChatMessage message={m} />
      ))}
    </Box>
  );
};

export default AssistantChatFeed;
