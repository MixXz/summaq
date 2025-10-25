import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import useAssistantChat from "../../hooks/assistant-chat";
import AssistantSideChatToggleButton from "./AssistantSideChatToggleButton";
import AssistantChatFeed from "./widgets/AssistantChatFeed";
import AssistantChatInput from "./widgets/AssistantChatInput";

type ChatMsg = { role: "user" | "assistant"; content: string };

type Props = {
  context: string;
};

const AssistantSideChat = ({ context }: Props) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const { answer, loading, error, askWithText, reset } = useAssistantChat();

  useEffect(() => {
    if (!answer) return;
    setMessages((prev) => [{ role: "assistant", content: answer }, ...prev]);
  }, [answer]);

  const handleSend = (question: string) => {
    if (!question.trim()) return;
    setMessages((prev) => [{ role: "user", content: question }, ...prev]);
    askWithText(context, question);
  };

  const handleClear = () => {
    setMessages([]);
    reset();
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ slotProps: { backdrop: { sx: { background: "none" } } } }}
        PaperProps={{
          style: { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
        }}
      >
        <AssistantChatFeed
          isSideChat
          messages={messages}
          loading={loading}
          error={error}
          onClear={handleClear}
        />
        <AssistantChatInput loading={loading} onSend={handleSend} />
      </Drawer>
      <AssistantSideChatToggleButton open={open} setOpen={setOpen} />
    </>
  );
};

export default AssistantSideChat;
