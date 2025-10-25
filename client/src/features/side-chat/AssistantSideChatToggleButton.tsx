import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Avatar, Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import logo from "../../../public/assistant-logo.png";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AssistantSideChatToggleButton = ({ open, setOpen }: Props) => {
  return (
    <Box
      sx={{
        padding: 1,
        display: "flex",
        alignItems: "center",
        position: "fixed",
        right: open ? "32rem" : "2rem", // Adjust based on width of the chat
        top: "95%",
        transform: "translateY(-95%)",
        zIndex: 1300,
        transition: "right 0.25s",
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px",
        cursor: "pointer",
        color: "grey",
      }}
      onClick={() => setOpen((prev) => !prev)}
    >
      {!open && <ArrowBackIosIcon />}
      <Avatar src={logo} sx={{ width: 90, height: 90 }} />
      {open && <ArrowForwardIosIcon />}
    </Box>
  );
};

export default AssistantSideChatToggleButton;
