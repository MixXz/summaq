import { DescriptionRounded as FileIcon } from "@mui/icons-material";
import { Box, Skeleton, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import AssistantChatHead, { Message as HeadMessage } from "./AssistantChatHead";

export type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: number | Date;
  images?: string[];
  files?: { name?: string; object_name?: string; url?: string }[];
};

type Props = {
  message: Message;
};

const AssistantChatMessage = forwardRef<HTMLDivElement, Props>(
  ({ message }, ref) => {
    const isUser = message.role === "user";
    const radius = "22px";

    const renderContent = (content: string) => {
      // strip any streaming separators and bracketed citations you might inject
      const trimmedContent = content.split(".../...")[0];
      const cleanedContent = trimmedContent.replace(/【.*?】/g, "");
      const parts = cleanedContent.split(/(\*\*.*?\*\*)/g);

      return parts.map((part, index) => {
        if (/\*\*.*?\*\*/.test(part)) {
          return <strong key={index}>{part.replace(/\*\*/g, "")}</strong>;
        }
        return <span key={index}>{part}</span>;
      });
    };

    const images = message.images ?? [];
    const files = message.files ?? [];

    return (
      <Box
        ref={ref}
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
        }}
      >
        <AssistantChatHead message={message as HeadMessage} />

        {(images.length > 0 || files.length > 0) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            {images.length > 0 && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {images.map((img, ind) => (
                  <ImageWithLoading key={ind} src={img} />
                ))}
              </Box>
            )}
            {files.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {files.map((file, ind) => (
                  <FileDownload
                    key={ind}
                    name={file.name ?? file.object_name ?? "file"}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}

        <Box
          sx={{
            ml: isUser ? 0 : 1,
            mr: isUser ? 1 : 0,
            mt: 0.5,
            p: 1.5,
            borderBottomRightRadius: radius,
            borderBottomLeftRadius: radius,
            borderTopRightRadius: isUser ? 0 : radius,
            borderTopLeftRadius: isUser ? radius : 0,
            backgroundColor: isUser ? "rgba(210, 245, 255, 1)" : "#e9e9e9ff",
            maxWidth: "85%",
          }}
        >
          <Typography
            fontSize={14}
            component="pre"
            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {renderContent(message.content)}
          </Typography>
        </Box>
      </Box>
    );
  }
);

type ImageProps = { src: string };

const ImageWithLoading = ({ src }: ImageProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    const done = () => setLoading(false);
    img.onload = done;
    img.onerror = done;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <Box sx={{ width: 200, height: 200, position: "relative", mt: 0.5 }}>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={200}
          height={200}
          sx={{ borderRadius: "15px" }}
        />
      ) : (
        <img
          alt="attachment"
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />
      )}
    </Box>
  );
};

type FileProps = { name: string };

const FileDownload = ({ name }: FileProps) => {
  const extractFilename = (objectName: string): string => {
    const parts = objectName.split("_", 2);
    return parts.length === 2 ? parts[1] : objectName;
  };

  return (
    <Box
      sx={{
        width: 260,
        height: 60,
        p: 1,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        bgcolor: "#E0E0E0",
        position: "relative",
        border: "1px solid #DCDCDC",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: "#e47a28",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <DescriptionRoundedIconShim />
      </Box>
      <Box
        sx={{ ml: 1, display: "flex", flexDirection: "column", width: "80%" }}
      >
        <Typography noWrap fontSize={14} fontWeight={600}>
          {extractFilename(name)}
        </Typography>
      </Box>
    </Box>
  );
};

const DescriptionRoundedIconShim = () => <FileIcon fontSize="small" />;

export default AssistantChatMessage;
