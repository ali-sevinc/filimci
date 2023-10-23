import { useState } from "react";

import { WatchedType } from "../../helpers/types";

import Star from "../ui/Star";
import Message from "../ui/Message";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import Details from "./Details";
import useTitle from "./useTitle";

interface SelectedMovieType {
  movie: WatchedType | null;
  onAddWatched: (movie: WatchedType) => void;
  isLoading: boolean;
  isError: string | null;
  onClose: () => void;
}

function SelectedMovie({
  movie,
  onAddWatched,
  isLoading,
  isError,
  onClose,
}: SelectedMovieType) {
  const [yourRating, setYourRating] = useState(0);

  useTitle({ title: movie?.Title });

  function handleAdd() {
    if (!movie || !yourRating) return;
    const DATA: WatchedType = {
      Actors: movie?.Actors,
      imdbID: movie?.imdbID,
      Plot: movie?.Plot,
      Poster: movie?.Poster,
      imdbRating: movie?.imdbRating,
      Runtime: movie?.Runtime,
      Title: movie?.Title,
      Year: movie?.Year,
      userRating: yourRating,
    };
    onAddWatched(DATA);
  }

  if (isError) return <Message isError={true}>{isError}</Message>;
  if (isLoading) return <Loader />;
  if (!movie) return <Message>Movie Not Found</Message>;
  return (
    <Details movie={movie}>
      <div className=" mt-1 flex flex-col items-start gap-2">
        <Star size={24} maxStar={10} onGetRating={setYourRating} />
        <div className="flex gap-4">
          <Button onClick={onClose}>Cancel</Button>
          {yourRating > 0 && (
            <Button onClick={handleAdd}>Add as Watched</Button>
          )}
        </div>
      </div>
    </Details>
  );
}

export default SelectedMovie;
