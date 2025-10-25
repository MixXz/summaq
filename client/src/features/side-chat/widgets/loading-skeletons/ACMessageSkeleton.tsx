import { Box, Skeleton } from "@mui/material";

type Props = {
  inverse?: boolean;
  messageWidth?: number;
  messageHeight?: number;
};

const ACMessageSkeleton = ({
  messageWidth = 500,
  messageHeight = 60,
  inverse = false,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: inverse ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexDirection: inverse ? "row-reverse" : "row",
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: inverse ? "flex-end" : "flex-start",
          }}
        >
          <Skeleton variant="text" sx={{ fontSize: 13, width: "8rem" }} />
          <Skeleton variant="text" sx={{ fontSize: 10, width: "2rem" }} />
        </Box>
      </Box>
      <Skeleton
        variant="rounded"
        width={messageWidth}
        height={messageHeight}
        sx={{ mt: 1, ml: inverse ? 0 : 3, mr: inverse ? 3 : 0 }}
      />
    </Box>
  );
};

export default ACMessageSkeleton;
