import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { WatchedType } from "./helpers/types";
import useMovie from "./components/movies/useMovie";
import useMovies from "./components/movies/useMovies";
import useLocal from "./components/movies/useLocal";
import useModal from "./components/ui/useModal";

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
import Confirm from "./components/movies/Confirm";

function App() {
  const [query, setQuery] = useState<string>("");

  const [selectedMovie, setSelectedMovie] = useState<WatchedType | null>(null);

  //localstorage action
  const { watchedMovies, setWatchMovies } = useLocal();

  const {
    handleCloseModal: closeMovieDetails,
    showModal: showMovieDetails,
    setShowModal: setShowMovieDetails,
  } = useModal();
  const {
    handleCloseModal: closeSelectedMovie,
    showModal: showSelectedMovie,
    setShowModal: setShowSelectedMovie,
  } = useModal();
  const {
    handleCloseModal: closeConfirmModal,
    showModal: showConfirmModal,
    setShowModal: setShowConfirmModal,
  } = useModal();

  //query actions.
  const { isLoading, movies, isError } = useMovies(query); //custom hooks
  function handleQuery(value: string) {
    setQuery(value);
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

  //watched movies actions.
  function handleSelectDetails(imdbID: string) {
    setShowMovieDetails(true);
    setSelectedMovie(
      watchedMovies.find((item) => item.imdbID === imdbID) || null,
    );
  }

  function handleConfirmation() {
    setShowConfirmModal(true);
    setShowMovieDetails(false);
  }
  function handleCancelConfirm() {
    setShowConfirmModal(false);
    setShowMovieDetails(true);
  }
  function handleDeleteMovie() {
    if (!confirm) return;
    setWatchMovies((movies) =>
      movies.filter((movie) => movie.imdbID !== selectedMovie?.imdbID),
    );
    setShowMovieDetails(false);
    setShowConfirmModal(false);
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
        {showConfirmModal && (
          <Modal onClose={closeConfirmModal}>
            <Confirm
              title={selectedMovie?.Title || ""}
              onCancel={handleCancelConfirm}
              onConfirm={handleDeleteMovie}
            />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSelectedMovie && (
          <Modal onClose={closeSelectedMovie}>
            <SelectedMovie
              isError={selectedMovieError}
              isLoading={selectedMovieLoading}
              movie={selectedMovie}
              onAddWatched={handleAddWatched}
              onClose={closeSelectedMovie}
            />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showMovieDetails && (
          <Modal onClose={closeMovieDetails}>
            <MovieDetails
              onClose={closeMovieDetails}
              onUpdate={handleUpdateMovie}
              onDelete={handleConfirmation}
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
