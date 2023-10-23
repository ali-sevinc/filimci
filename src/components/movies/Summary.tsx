import { avgCalculator, avgRuntime } from "../../helpers/functions";
import { WatchedType } from "../../helpers/types";

interface PropsType {
  watchedMovies: WatchedType[];
}

function Summary({ watchedMovies }: PropsType) {
  const movieNum = watchedMovies?.length;
  const avgStars = avgCalculator(watchedMovies, "userRating");
  const avgImdb = avgCalculator(watchedMovies, "imdbRating");
  const avgRun = avgRuntime(watchedMovies);
  return (
    <div className="h-24 rounded-t-md bg-slate-600 pb-8 ">
      <h2 className="py-3 text-center text-2xl">Watched Movies</h2>
      <div className="flex justify-between px-4">
        <p>#️⃣ {movieNum} movies</p>
        <p>⭐ {avgImdb}</p>
        <p>🌟 {avgStars}</p>
        <p>⏱ {avgRun} min</p>
      </div>
    </div>
  );
}

export default Summary;
