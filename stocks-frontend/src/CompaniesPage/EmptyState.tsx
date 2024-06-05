import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

const EmptyState = () => (
  <Alert>
    <AlertIcon />
    <AlertTitle>No companies to show</AlertTitle>
    <AlertDescription>Try changing your filters</AlertDescription>
  </Alert>
);

export default EmptyState;
