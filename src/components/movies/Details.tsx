import { ReactNode } from "react";

import { WatchedType } from "../../helpers/types";

interface PropsType {
  children: ReactNode;
  movie: WatchedType;
}

function Details({ children, movie }: PropsType) {
  return (
    <div className="flex flex-col items-center gap-2 text-slate-100 md:flex-row md:items-start ">
      <img src={movie.Poster} className="w-48 " />
      <div className="p-2">
        <h2 className="text-2xl font-bold">{movie.Title}</h2>
        <p className="flex gap-4 py-1">
          <span>📅{movie.Year}</span>
          <span>⭐{movie.imdbRating}</span>
          <span>⏱{movie.Runtime}</span>
        </p>
        <p className="py-2  text-sm">{movie.Plot}</p>
        <p className="pb-4 pt-2 text-lg italic ">{movie.Actors}</p>
        <div className=" mt-1 flex flex-col items-start gap-2">{children}</div>
      </div>
    </div>
  );
}

export default Details;
