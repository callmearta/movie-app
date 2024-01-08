import { TouchableOpacity, View, Animated, Easing } from "react-native";
import useMovieContext from "./useMovieContext";
import MovieTitle from "./movieTitle";
import MovieBody from "./movieBody";
import MovieYear from "./movieYear";
import MovieImage from "./movieImage";
import { useEffect, useRef } from "react";
import { MovieContextProvider } from "./movieContext";
import { useNavigation } from "@react-navigation/native";
import useConfig from "../../hooks/useConfig";

type Props = {
  movie: any;
  children: React.ReactNode;
  index: number;
};

const Movie = ({ movie, children, index }: Props) => {
  const navigation = useNavigation();
  const { configValue } = useConfig();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
      delay: 50 * index
    }).start();
    Animated.timing(offsetAnim,{
      toValue:0,
      duration:250,
      useNativeDriver:true,
      delay: 50 * index
    }).start();
  }, []);
  return (
    <MovieContextProvider movie={movie}>
      <TouchableOpacity
        onPress={() =>
          // @ts-ignore
          navigation.navigate("Movie", {
            id: movie.id,
            imageUrl:
              configValue.images.secure_base_url + "w500" + movie.poster_path,
            name: movie.media_type == "tv" ? movie.name : movie.title,
            overview: movie.overview,
            type: movie.media_type,
            releaseYear: Number(
              movie.media_type == "tv"
                ? movie.first_air_date.split("-")[0]
                : movie.release_date.split("-")[0]
            ),
          })
        }
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            borderBottomWidth: 1,
            borderColor: "rgba(255,255,255,.05)",
            borderRadius: 14,
            transform: [{ translateX: offsetAnim }],
            display: "flex",
            width: "100%",
            flex: 1,
            flexDirection: "row",
            // marginVertical: 8,
          }}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    </MovieContextProvider>
  );
};

Movie.Title = MovieTitle;
Movie.Body = MovieBody;
Movie.Year = MovieYear;
Movie.Image = MovieImage;

export default Movie;
