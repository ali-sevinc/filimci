import { useState } from "react";

import { WatchedType } from "../../helpers/types";

import Star from "../ui/Star";
import Message from "../ui/Message";
import Button from "../ui/Button";
import Details from "./Details";
import useTitle from "./useTitle";

interface PropsTypes {
  movie: WatchedType | null;
  onDelete: (imdbID: string) => void;
  onUpdate: (data: WatchedType) => void;
  onClose: () => void;
}

function MovieDetails({ movie, onDelete, onUpdate, onClose }: PropsTypes) {
  const [yourRating, setYourRating] = useState<number>(movie?.userRating || 0);

  const isUpdated = yourRating !== movie?.userRating;

  useTitle({ title: movie?.Title });

  function handleUpdate() {
    if (!movie) return;
    const DATA = movie;
    DATA.userRating = yourRating;
    onUpdate(DATA);
  }

  if (!movie) return <Message>Movie not found</Message>;

  return (
    <Details movie={movie}>
      <div className=" mt-1 flex flex-col items-start gap-2">
        <Star
          defaultRating={yourRating}
          size={24}
          maxStar={10}
          onGetRating={setYourRating}
        />
        <div className="flex gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onDelete(movie?.imdbID)}>Delete</Button>
          {isUpdated && <Button onClick={handleUpdate}>Update</Button>}
        </div>
      </div>
    </Details>
  );
}

export default MovieDetails;
