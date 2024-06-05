import { Company, Paginated, SortBy } from "../types";
import CompanyCard from "./CompanyCard";
import ErrorMessage from "./ErrorMessage";
import { ExchangeOption } from "./exchanges";
import useApi from "../useApi";
import { Dispatch, SetStateAction } from "react";
import { ScoreFilter } from ".";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import { Stack } from "@chakra-ui/react";
import Pagination from "./Pagination";

interface Props {
  sortBy: SortBy;
  scoreFilter: ScoreFilter;
  exchange: ExchangeOption;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const pageSize = 3;

const List = ({ page, ...props }: Props) => {
  const { data, error } = useApi<Paginated<Company>>("companies", {
    sortBy: props.sortBy,
    exchange: props.exchange,
    scoreFilter: props.scoreFilter,
    offset: page - 1,
    limit: pageSize,
    includePrices: true,
  });

  if (error) return <ErrorMessage text={error.message} />;
  if (!data) return <LoadingState />;
  if (data.items.length == 0) return <EmptyState />;

  return (
    <Stack spacing={4}>
      {data.items.map((company) => (
        <CompanyCard {...company} key={company.id} />
      ))}
      <Pagination
        page={page}
        pages={Math.ceil(data.total_items / pageSize)}
        setPage={props.setPage}
        totalItems={data.total_items}
      />
    </Stack>
  );
};

export default List;
