import { Text } from "react-native";
import useMovieContext from "./useMovieContext";

type Props = {
  children: React.ReactNode;
};

export default function MovieTitle({ children }: Props) {
  const { value } = useMovieContext();

  return (
    <Text
      numberOfLines={2}
      style={{
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFF",
        lineHeight:20,
        width:'100%'
      }}
    >
      {children}
    </Text>
  );
}
