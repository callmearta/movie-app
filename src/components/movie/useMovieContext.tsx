import { useContext, useEffect, useState } from "react";
import MovieContext from "./movieContext";

const useMovieContext = () => {
  const { value, set } = useContext(MovieContext);

  return {
    value,
    set,
  };
};

export default useMovieContext;
