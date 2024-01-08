import { Image } from "react-native";
import useMovieContext from "./useMovieContext";
import useConfig from "../../hooks/useConfig";

const MovieImage = () => {
  const { value } = useMovieContext();
  const { configValue } = useConfig();

  return (
    <Image
      style={{
        borderRadius: 12,
        margin: 12,
        aspectRatio: 9 / 12,
      }}
      resizeMode="contain"
      source={{
        uri: configValue.images.secure_base_url + "w200" + value.poster_path,
        width: 100,
      }}
    />
  );
};

export default MovieImage;
