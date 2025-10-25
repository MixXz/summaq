import { Box, Skeleton } from "@mui/material";

const ACChatsSkeleton = ({ count = 6 }) => {
  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width="100%"
          height={40}
          sx={{ mt: 1 }}
        />
      ))}
    </Box>
  );
};

export default ACChatsSkeleton;
