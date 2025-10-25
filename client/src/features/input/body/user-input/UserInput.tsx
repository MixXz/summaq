/* eslint-disable @typescript-eslint/no-explicit-any */
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";
import * as mammoth from "mammoth/mammoth.browser";
import { Dispatch, SetStateAction, useRef } from "react";
import "./UserInput.css";

type Props = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: () => Promise<void>;
};

const UserInput = ({ input, handleSubmit, setInput }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const name = file.name.toLowerCase();
    try {
      let text = "";
      if (name.endsWith(".docx")) {
        text = await extractDocxText(file);
      } else if (name.endsWith(".txt")) {
        text = await file.text();
      } else {
        alert("Please upload a .docx or .txt file.");
        return;
      }

      const normalized = normalizeWhitespace(text);
      if (!normalized.trim()) {
        alert("No text extracted from the file.");
        return;
      }

      setInput(normalized);
    } catch (err) {
      console.error("Error reading file:", err);
      alert("Failed to read file. Check its format.");
    } finally {
      e.target.value = "";
    }
  };

  const extractDocxText = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return value ?? "";
  };

  const normalizeWhitespace = (s: string): string =>
    s
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

  return (
    <div className="user-input-main-cont">
      <textarea
        value={input}
        placeholder='Enter or paste your text or upload a .docx / .txt file, then click "Summarize."'
        onChange={handleTextChange}
      />
      <div className="user-input-buttons">
        <input
          type="file"
          accept=".docx,.txt"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <Button
          variant="outlined"
          sx={{ borderRadius: 3, textTransform: "none" }}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadFileIcon sx={{ mr: 1 }} />
          Upload doc
        </Button>
        <Button
          variant="contained"
          sx={{ mr: 5, borderRadius: 3, textTransform: "none" }}
          onClick={handleSubmit}
        >
          Summarize
        </Button>
      </div>
    </div>
  );
};

export default UserInput;
