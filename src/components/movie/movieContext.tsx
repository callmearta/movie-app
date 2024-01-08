import { SetStateAction, createContext, useState } from "react";

type MovieContextType = {
  value: any;
  set: React.Dispatch<SetStateAction<{}>>;
};

const MovieContext = createContext<MovieContextType>({
  value: {},
  set: () => {},
});

type Props = {
  children: React.ReactNode;
  movie: any;
};
export const MovieContextProvider = ({ children, movie }: Props) => {
  const [value, set] = useState(movie);
  return (
    <MovieContext.Provider value={{ value, set }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
