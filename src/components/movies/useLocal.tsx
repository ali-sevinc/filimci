import { useEffect, useState } from "react";
import { WatchedType } from "../../helpers/types";

function useLocal() {
  const [watchedMovies, setWatchMovies] = useState<WatchedType[] | []>(() =>
    JSON.parse(localStorage.getItem("watchedmovies")!),
  );

  //localStorage actions
  useEffect(
    function () {
      localStorage.setItem(
        "watchedmovies",
        JSON.stringify(watchedMovies || []),
      );
    },
    [watchedMovies],
  );
  return { watchedMovies, setWatchMovies };
}

export default useLocal;
