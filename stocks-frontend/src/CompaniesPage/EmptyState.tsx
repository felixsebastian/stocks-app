import { Card, Text } from "@chakra-ui/react";

const EmptyState = () => (
  <Card p={12}>
    <Text>No companies to show! Try changing your filters</Text>
  </Card>
);

export default EmptyState;
