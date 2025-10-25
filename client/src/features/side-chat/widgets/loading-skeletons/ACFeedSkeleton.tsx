import { Box } from "@mui/material";
import ACMessageSkeleton from "./ACMessageSkeleton";

const ACFeedSkeleton = () => {
  return (
    <Box>
      <ACMessageSkeleton messageWidth={400} messageHeight={40} />
      <ACMessageSkeleton
        messageWidth={400}
        messageHeight={100}
        inverse={true}
      />
      <ACMessageSkeleton messageHeight={80} />
      <ACMessageSkeleton inverse={true} />
      <ACMessageSkeleton />
    </Box>
  );
};

export default ACFeedSkeleton;
