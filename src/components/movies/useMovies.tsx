import { useEffect, useState } from "react";

import { MovieType } from "../../helpers/types";
import { KEY } from "../../helpers/functions";

function useMovies(query: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[] | []>([]);
  const [isError, setIsError] = useState<string | null>(null);
  useEffect(
    function () {
      setIsLoading(true);
      setMovies([]);
      setIsError(null);
      const queryTimer = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          );

          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          setMovies(data?.Search);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setIsError(error.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }, 500);
      return () => {
        clearTimeout(queryTimer);
      };
    },
    [query],
  );

  return { movies, isLoading, isError };
}

export default useMovies;
