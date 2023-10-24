import { useEffect, useState } from "react";
import { WatchedType } from "../../helpers/types";

function useLocal() {
  const [watchedMovies, setWatchMovies] = useState<WatchedType[] | []>(() => {
    const local = localStorage.getItem("watchedmovies");
    return local ? JSON.parse(local) : [];
  });

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
