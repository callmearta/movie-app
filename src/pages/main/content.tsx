import { Text, View } from "react-native";
import Movie from "../../components/movie/movie";
import useConfig from "../../hooks/useConfig";
import { getConfigurationTMDB } from "../../tmdb";
import { useEffect } from "react";

type Props = {
  data: any;
};

export default function Content({ data }: Props) {
  const { setConfig } = useConfig();

  const _fetchConfig = async () => {
    const result = await getConfigurationTMDB();
    setConfig(result);
  };

  useEffect(() => {
    _fetchConfig();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 0,
      }}
    >
      {data.map((r: any,index:number) => (
        <Movie movie={r} index={index} key={r.id}>
          <Movie.Image />
          <Movie.Body>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems:'center',
                // width:'100%',
                // overflow:'hidden'
              }}
            >
              <Movie.Title>{r.title || r.name}</Movie.Title>
              <Text style={{
                color:"#FFF",
                fontSize:10,
                // flex:.5,
              }}>{r.media_type == "tv" ? "TV Show" : "Movie"}</Text>
            </View>
            <Movie.Year />
            <Text
              numberOfLines={3}
              style={{
                // width: 220,
                marginTop: 12,
                fontSize: 12,
                color: "#FFF",
                flex:1,
                width:'100%'
              }}
            >
              {r.overview}
            </Text>
          </Movie.Body>
        </Movie>
      ))}
    </View>
  );
}
