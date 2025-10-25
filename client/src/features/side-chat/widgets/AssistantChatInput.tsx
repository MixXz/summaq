// widgets/AssistantChatInput.tsx
import { NavigationRounded as SendIcon } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useCallback, useState } from "react";

type Props = {
  loading: boolean;
  onSend: (question: string) => void; // ← only question now
};

const AssistantChatInput = ({ loading, onSend }: Props) => {
  const [question, setQuestion] = useState("");

  const handleSend = useCallback(() => {
    const q = question.trim();
    if (!q) return;
    onSend(q);
    setQuestion("");
  }, [question, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Box sx={{ p: 4 }}>
      <TextField
        label="Question"
        placeholder="Ask a question about your current context…"
        fullWidth
        multiline
        maxRows={6}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ mb: 1.5, alignSelf: "flex-end" }}
            >
              <IconButton
                disableRipple
                color="success"
                onClick={handleSend}
                disabled={loading || !question.trim()}
                sx={{ m: 0, p: 0 }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: { borderRadius: "12px", backgroundColor: "#f4f4f4" },
        }}
        sx={{
          "& .MuiOutlinedInput-root fieldset": { border: "none" },
          "& .MuiInputBase-multiline": { p: "10px 14px" },
        }}
      />
    </Box>
  );
};

export default AssistantChatInput;
