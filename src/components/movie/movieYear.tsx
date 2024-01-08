import { Text } from "react-native";
import useMovieContext from "./useMovieContext";
import { useMemo } from "react";

export default function MovieYear() {
  const { value } = useMovieContext();
  const year = useMemo(() => (value.media_type == 'tv' ? value?.first_air_date?.split('-')[0] : value?.release_date?.split('-')[0]),[value])
  
  return (
    <Text
      style={{
        color: "rgba(255,255,255,.5)",
      }}
    >
      {year}
    </Text>
  );
}
