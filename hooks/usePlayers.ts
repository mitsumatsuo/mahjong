import useSWR from "swr";
import { Player } from "../lib/mahjong";

type Result = {
  data: Player[];
  isLoading: boolean;
  isError: any;
};

const usePlayers = (): Result => {
  const { data, error } = useSWR(`/api/player`, (url) =>
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

export default usePlayers;
