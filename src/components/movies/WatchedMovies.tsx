import { motion } from "framer-motion";

import { WatchedType } from "../../helpers/types";

import Summary from "./Summary";
import WatchedItem from "./WatchedItem";
import Container from "../ui/Container";
import Message from "../ui/Message";

interface PropsType {
  watchedMovies: WatchedType[];
  onShowMovie: (imdbID: string) => void;
}

function WatchedMovies({ watchedMovies, onShowMovie }: PropsType) {
  return (
    <Container>
      {!watchedMovies?.length && <Message>Add a movie to list</Message>}
      {watchedMovies?.length > 0 && (
        <>
          <Summary watchedMovies={watchedMovies} />
          <motion.ul
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1  "
          >
            {watchedMovies.map((movie: WatchedType) => (
              <WatchedItem
                onShowMovie={onShowMovie}
                key={movie?.imdbID}
                movie={movie}
              />
            ))}
          </motion.ul>
        </>
      )}
    </Container>
  );
}

export default WatchedMovies;
