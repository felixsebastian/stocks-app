import { Dispatch, SetStateAction } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";

interface Props {
  page: number;
  pages: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
}

const Pagination = ({ page, setPage, pages, totalItems }: Props) => (
  <Flex align="center">
    <Button
      bg="white"
      isDisabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      aria-label="Next page"
      leftIcon={<ChevronLeftIcon />}
    >
      Previous page
    </Button>
    <Spacer />
    <Text>
      Page {page} of {pages} ({totalItems} total)
    </Text>
    <Spacer />
    <Button
      bg="white"
      isDisabled={page === pages}
      onClick={() => setPage((p) => p + 1)}
      aria-label="Next page"
      rightIcon={<ChevronRightIcon />}
    >
      Next page
    </Button>
  </Flex>
);

export default Pagination;
