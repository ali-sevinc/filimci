import { useState } from "react";

import { KEY } from "../../helpers/functions";

function useMovie() {
  const [selectedMovieError, setSelectedMovieError] = useState<string | null>(
    null,
  );
  const [selectedMovieLoading, setSelectedMovieLoading] =
    useState<boolean>(false);

  async function getMovie(imdbID: string) {
    let movie;
    try {
      setSelectedMovieLoading(true);
      setSelectedMovieError(null);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`,
      );
      if (!res.ok) throw new Error("Someting went wrong..");
      const data = await res.json();
      movie = data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSelectedMovieError(error?.message || "Something went wrong");
    } finally {
      setSelectedMovieLoading(false);
    }
    return { movie, selectedMovieError };
  }

  return { getMovie, selectedMovieError, selectedMovieLoading };
}

export default useMovie;
