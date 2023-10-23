import { motion, AnimatePresence } from "framer-motion";

import { MovieType } from "../../helpers/types";

import Container from "../ui/Container";
import Loader from "../ui/Loader";
import Message from "../ui/Message";
import MovieItem from "./MovieItem";

interface PropsType {
  movies: MovieType[];
  isLoading: boolean;
  isError: string | null;
  query: string;
  onFetchMovie: (imdbID: string) => void;
}

function Movies({
  movies,
  isLoading,
  isError,
  query,
  onFetchMovie,
}: PropsType) {
  return (
    <Container>
      <AnimatePresence mode="wait">
        {query?.length < 3 && !isLoading && !isError && (
          <Message key="fallback-search">Search a movie</Message>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isError && (
          <Message key="fallback-error" isError={true}>
            {isError}
          </Message>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isLoading && !isError && <Loader key="loader" />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!movies?.length && !isLoading && !isError && query?.length >= 3 && (
          <Message key="fallback-noMovie">No movie found</Message>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {movies?.length > 0 && (
          <motion.ul
            key="movieList"
            exit={{ opacity: 0, y: -30 }}
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1"
          >
            <AnimatePresence>
              {movies.map((movie: MovieType) => (
                <MovieItem
                  onFetchMovie={onFetchMovie}
                  key={movie.imdbID}
                  movie={movie}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default Movies;
