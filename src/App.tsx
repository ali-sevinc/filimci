import { ChangeEvent, useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { WatchedType } from "./helpers/types";
import useMovie from "./components/movies/useMovie";
import useMovies from "./components/movies/useMovies";

import Main from "./components/layout/Main";
import Movies from "./components/movies/Movies";
import SearchBar from "./components/layout/SearchBar";
import MainHeader from "./components/layout/MainHeader";
import ResultsNum from "./components/layout/ResultsNum";
import WatchedMovies from "./components/movies/WatchedMovies";
import Modal from "./components/ui/Modal";
import SelectedMovie from "./components/movies/SelectedMovie";
import MovieDetails from "./components/movies/MovieDetails";
import Footer from "./components/layout/Footer";

function App() {
  const [query, setQuery] = useState<string>("");

  const [selectedMovie, setSelectedMovie] = useState<WatchedType | null>(null);

  const [showSelectedMovie, setShowSelectedMovie] = useState<boolean>(false);

  const [showMovieDetails, setShowMovieDetails] = useState<boolean>(false);

  const [watchedMovies, setWatchMovies] = useState<WatchedType[] | []>(() =>
    JSON.parse(localStorage.getItem("watchedmovies")!),
  );

  //query actions.
  const { isLoading, movies, isError } = useMovies(query); //custom hooks
  function handleQuery(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }
  const moviesLength = movies?.length;

  //selected movie actions.
  const { getMovie, selectedMovieError, selectedMovieLoading } = useMovie(); //custom hooks
  async function handleFetchMovie(imdbID: string) {
    const isInList = watchedMovies?.find((movie) => movie.imdbID === imdbID);
    if (isInList) {
      setShowMovieDetails(true);
      setSelectedMovie(isInList);
      return;
    }
    setShowSelectedMovie(true);
    const { movie } = await getMovie(imdbID);
    setSelectedMovie(movie);
  }
  function handleAddWatched(movie: WatchedType) {
    //for double-check.
    if (watchedMovies?.find((item) => item.imdbID === movie.imdbID)) {
      alert(selectedMovie?.Title + " allready in the list.");
      setShowSelectedMovie(false);
      return;
    }
    setWatchMovies((prev) => [...prev, movie]);
    setShowSelectedMovie(false);
  }

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

  //modal action.
  function handleCloseModal() {
    setShowSelectedMovie(false);
    setShowMovieDetails(false);
    setSelectedMovie(null);
  }
  useEffect(
    function () {
      if (!showMovieDetails && !showSelectedMovie) return;
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          // console.log("-->Esc");
          handleCloseModal();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    },
    [showMovieDetails, showSelectedMovie],
  );

  //watched movies actions.
  function handleSelectDetails(imdbID: string) {
    setShowMovieDetails(true);
    setSelectedMovie(
      watchedMovies.find((item) => item.imdbID === imdbID) || null,
    );
  }

  function handleDeleteMovie(imdbID: string) {
    const confirm = window.confirm(
      "Are you sure? This actions cannot be undone.",
    );

    if (!confirm) return;
    setWatchMovies((movies) =>
      movies.filter((movie) => movie.imdbID !== imdbID),
    );
    setShowMovieDetails(false);
    setSelectedMovie(null);
  }
  function handleUpdateMovie(data: WatchedType) {
    setWatchMovies((movies) =>
      movies.map((movie) => (movie.imdbID === data.imdbID ? data : movie)),
    );
    setShowMovieDetails(false);
    setSelectedMovie(null);
  }

  return (
    <>
      {/*createPortal actions */}
      <AnimatePresence>
        {showSelectedMovie && (
          <Modal onClose={handleCloseModal}>
            <SelectedMovie
              isError={selectedMovieError}
              isLoading={selectedMovieLoading}
              movie={selectedMovie}
              onAddWatched={handleAddWatched}
              onClose={handleCloseModal}
            />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showMovieDetails && (
          <Modal onClose={handleCloseModal}>
            <MovieDetails
              onClose={handleCloseModal}
              onUpdate={handleUpdateMovie}
              onDelete={handleDeleteMovie}
              movie={selectedMovie}
            />
          </Modal>
        )}
      </AnimatePresence>
      <div className="flex min-h-screen  flex-col">
        <MainHeader>
          <SearchBar onSearch={handleQuery} searchValue={query} />
          <ResultsNum moviesLength={moviesLength} />
        </MainHeader>

        <Main>
          <Movies
            onFetchMovie={handleFetchMovie}
            movies={movies}
            isLoading={isLoading}
            isError={isError}
            query={query}
          />
          <WatchedMovies
            onShowMovie={handleSelectDetails}
            watchedMovies={watchedMovies}
          />
        </Main>

        <Footer />
      </div>
    </>
  );
}

export default App;
