import { useState } from "react";
import Select from "./Select";
import { SortBy } from "../types";
import List from "./List";
import { HStack, Heading, Spacer, Stack } from "@chakra-ui/react";
import { ExchangeOption, exchangeOptions } from "./exchanges";
import { ScoreFilter } from "./types";
import { snowflakeScoreOptions, sortByOptions } from "./options";

const CompaniesPage = () => {
  const [exchange, setExchange] = useState<ExchangeOption>("none");
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("none");
  const [sortBy, setSortBy] = useState<SortBy>("snowflake_score");
  const [page, setPage] = useState(1);

  return (
    <Stack spacing={4} m={8}>
      <HStack>
        <Heading mb={1}>Stocks App</Heading>
        <Spacer />
        <Select
          label="Exchange"
          options={exchangeOptions}
          value={exchange}
          onChange={(exchange) => {
            setExchange(exchange);
            setPage(1);
          }}
        />
        <Select
          label="Snowflake score"
          options={snowflakeScoreOptions}
          value={scoreFilter}
          onChange={(scoreFilter) => {
            setScoreFilter(scoreFilter);
            setPage(1);
          }}
        />
        <Select
          label="Sort by"
          options={sortByOptions}
          value={sortBy}
          onChange={(sortBy) => {
            setSortBy(sortBy);
            setPage(1);
          }}
        />
      </HStack>
      <List
        {...{
          sortBy,
          exchange,
          scoreFilter,
          page,
          setPage,
        }}
      />
    </Stack>
  );
};

export default CompaniesPage;
