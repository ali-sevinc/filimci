import { motion } from "framer-motion";

import { WatchedType } from "../../helpers/types";
import { smallTitle } from "../../helpers/functions";

interface PropsType {
  movie: WatchedType;
  onShowMovie: (imdbID: string) => void;
}
function WatchedItem({ movie, onShowMovie }: PropsType) {
  return (
    <motion.li
      layout
      variants={{
        hide: { opacity: 0, scale: 0.75 },
        show: { opacity: 1, scale: 1 },
      }}
      transition={{ type: "spring", duration: 0.3 }}
      onClick={() => onShowMovie(movie?.imdbID)}
      className=" flex h-24 w-[22rem]  cursor-pointer gap-4 border-b border-b-slate-500 px-4 py-2 duration-200 hover:bg-slate-800"
    >
      <img src={movie?.Poster} className="w-14" />
      <div className="flex w-full flex-col">
        <h2 className="text-xl">{smallTitle(movie?.Title)}</h2>
        <div className="flex justify-between">
          <p>⭐ {movie?.imdbRating}</p>
          <p>🌟 {movie?.userRating}</p>
          <p>⏱ {movie?.Runtime}</p>
        </div>
      </div>
    </motion.li>
  );
}

export default WatchedItem;
