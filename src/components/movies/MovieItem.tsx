import { motion } from "framer-motion";

import { MovieType } from "../../helpers/types";

interface PropsType {
  movie: MovieType;
  onFetchMovie: (imdbID: string) => void;
}
function MovieItem({ movie, onFetchMovie }: PropsType) {
  return (
    <motion.li
      layout
      variants={{
        hide: { opacity: 0, scale: 0.75 },
        show: { opacity: 1, scale: 1 },
      }}
      transition={{ type: "spring", duration: 0.3 }}
      onClick={() => onFetchMovie(movie.imdbID)}
      className="flex h-24 w-[22rem] cursor-pointer gap-4 border-b border-b-slate-500 px-4 py-2 duration-200 hover:bg-slate-800"
    >
      <img src={movie.Poster} className="w-14" />
      <div className="">
        <h2 className="text-xl">{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </motion.li>
  );
}

export default MovieItem;
