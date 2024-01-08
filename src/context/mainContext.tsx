import { createContext, useState } from "react";

type Value = {
  config: {
    [x: string]: any;
  };
};

type MainContext = {
  value: any;
  set: React.Dispatch<React.SetStateAction<Value>>;
};

const MainContext = createContext<MainContext>({
  value: {
    config: {},
  },
  set: () => null,
});

type Props = {
  children: React.ReactNode;
};

export const MainContextProvider = ({ children }: Props) => {
  const [value, set] = useState({
    config: {},
  });

  return <MainContext.Provider value={{ value, set }}>
    {children}
  </MainContext.Provider>;
};

export default MainContext;
