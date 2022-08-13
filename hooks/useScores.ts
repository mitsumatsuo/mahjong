import useSWR from "swr";
import { Score } from "../lib/mahjong";

type Result = {
  data: Score[];
  isLoading: boolean;
  isError: any;
};

const useScores = (): Result => {
  const { data, error } = useSWR(`/api/score`, (url) =>
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

export default useScores;
