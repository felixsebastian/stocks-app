import { ErrorBoundary } from "react-error-boundary";
import CompaniesPage from "./CompaniesPage";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ChakraProvider, baseTheme, extendTheme } from "@chakra-ui/react";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

const theme = extendTheme({
  styles: {
    global: {
      body: { bg: baseTheme.colors.gray[200] },
    },
  },
  fonts: {
    heading: `'Ibm Plex Sans Condensed', 'Noto Color Emoji', monospace !important`,
    body: `'Ibm Plex Mono', 'Noto Color Emoji', monospace !important`,
  },
});

interface Props {
  error: Error;
}

const Fallback = ({ error }: Props) => {
  console.log(error);
  return <p>something went wrong</p>;
};

const App = () => (
  <ErrorBoundary FallbackComponent={Fallback}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CompaniesPage />
      </ChakraProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
