import {
  Card,
  Flex,
  HStack,
  Heading,
  Spacer,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import countryCodeToFlagEmoji from "country-code-to-flag-emoji";
import { formatDate, parseISO } from "date-fns";
import { Company } from "../types";
import { pad, round } from "lodash";
import formatPrice from "./formatPrice";

const CompanyCard = (company: Company) => (
  <Card key={company.id} px={6} py={4}>
    <Flex align="center" gap={4}>
      <Stack flexBasis="35%" flexGrow={1} mt={-1}>
        <Heading as="h2" size="lg">
          {company.name}
        </Heading>
        <Text fontSize="lg">
          {company.exchange_symbol}:<b>{company.ticker_symbol}</b>{" "}
          {countryCodeToFlagEmoji(company.exchange_country_iso)}
        </Text>
      </Stack>
      <Spacer />
      <HStack flexBasis="65%" flexGrow={1} spacing={4} align="flex-start">
        <Stat>
          <StatLabel>Snowflake score</StatLabel>
          <StatNumber fontSize="5xl" mt={-2}>
            {company.snowflake_score}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Volatility</StatLabel>
          <StatNumber fontSize="5xl" mt={-2}>
            {round(company.volatility)}
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Current price</StatLabel>
          <StatNumber>{formatPrice(company.last_price)}</StatNumber>
          <StatHelpText>
            As of {formatDate(parseISO(company.last_price_date), "do MMM yyyy")}
          </StatHelpText>
        </Stat>
      </HStack>
    </Flex>
  </Card>
);

export default CompanyCard;
