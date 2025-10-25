import { Typography } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Input from "./features/input/Input";
import AssistantSideChat from "./features/side-chat/AssistantSideChat";

const App = () => {
  const [input, setInput] = useState<string>("");

  return (
    <div className="app-main-cont">
      <Typography className="app-title">
        Summa<span style={{ color: "#1c74d4" }}>Q</span>
      </Typography>
      <Typography
        className="app-subtitle"
        width="50rem"
        textAlign="center"
        mb={5}
      >
        <strong>
          Unlock <span style={{ color: "#1c74d4" }}>Understanding</span>
        </strong>
        : Summarize complex text into clear, concise points for easier learning
        and engaging presentations.
      </Typography>
      <Input input={input} setInput={setInput} />
      <AssistantSideChat context={input} />
    </div>
  );
};

export default App;
