export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type WatchedType = {
  Plot: string;
  Actors: string;
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: number;
  userRating?: number;
};

export type ValueType = {
  userRating: number;
  imdbRating: number;
  Runtime: number;
};
