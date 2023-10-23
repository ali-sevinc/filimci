function ResultsNum({ moviesLength }: { moviesLength: number }) {
  return (
    <>
      {!moviesLength && (
        <h2 className="pt-2 text-2xl md:pt-0 ">Found no result</h2>
      )}
      {moviesLength > 0 && (
        <h2 className="pt-2 text-2xl md:pt-0 ">Found {moviesLength} results</h2>
      )}
    </>
  );
}

export default ResultsNum;
