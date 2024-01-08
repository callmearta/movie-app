import { useContext } from "react";
import MainContext from "../context/mainContext";

export default function useMainContext() {
  const { value, set } = useContext(MainContext);
  return { value, set };
}
