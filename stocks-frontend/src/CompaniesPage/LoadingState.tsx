import { Skeleton, Stack } from "@chakra-ui/react";

const LoadingState = () => (
  <Stack>
    <Skeleton h={120} />
    <Skeleton h={120} />
    <Skeleton h={120} />
  </Stack>
);

export default LoadingState;
