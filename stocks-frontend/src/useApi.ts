import { entries } from "lodash";
import { useQuery } from "@tanstack/react-query";

const baseUrl = "http://localhost:47582/";
export type Params = Record<string, string | number | boolean>;

const useApi = <T>(path: string, params?: Params) => {
  const queryKey = [path, ...entries(params).flat()];
  const stringParams = entries(params).map(([k, v]) => [k, v.toString()]);
  const queryParams = new URLSearchParams(stringParams).toString();

  return useQuery<T>({
    queryKey,
    staleTime: 60 * 1000, // 1 minute
    queryFn: async () => {
      const result = await fetch(`${baseUrl}${path}?${queryParams}`, {
        method: "get",
        mode: "cors",
      });
      return await result.json();
    },
  });
};

export default useApi;
