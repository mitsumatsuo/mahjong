import useSWR from "swr";
import { Goal } from "../lib/mahjong";

type Result = {
  data: Goal[];
  isLoading: boolean;
  isError: boolean;
};

const useGoals = (): Result => {
  const { data, error } = useSWR(`/api/example`, (url) =>
    fetch(url)
      .then((r) => r.json())
      .catch((err) => console.error(err))
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGoals;
