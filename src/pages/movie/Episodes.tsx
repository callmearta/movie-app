import { Image, Text, TouchableOpacity, View } from "react-native";
import tmdbInstance from "../../tmdb";
import GlobalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";

export default function Episodes({ seasonData, movieData }: any) {
  const navigation = useNavigation();
  const _handleGoToPlayer = (ep: any) => {
    const episodeTmdbId = ep.id;
    const episodeNumber = ep.episode_number;
    const id = ep.show_id;
    const seasonTmdbId = seasonData.id;
    const seasonNumber = seasonData.season_number;
    const name = movieData.name;
    const releaseYear = movieData.first_air_date.split("-")[0];
    // @ts-ignore
    navigation.navigate("Player", {
      episodeNumber,
      episodeTmdbId,
      id,
      seasonTmdbId,
      seasonNumber,
      name,
      releaseYear,
    });
  };

  return (
    <View>
      <Text
        style={{
          ...GlobalStyles.textWhite,
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        Episodes
      </Text>
      {!seasonData.episodes.length && <Text style={{
        color:'rgba(255,255,255,.5)',
        textAlign:'center'
      }}>No episodes yet.</Text>}
      {seasonData.episodes.map((ep: any, index: number) => (
        <TouchableOpacity key={index} onPress={() => _handleGoToPlayer(ep)}>
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: "rgba(255,255,255,.1)",
              padding: 12,
              paddingHorizontal: 0,
            }}
          >
            <Image
              source={{
                uri: tmdbInstance.constructImageUrl(ep.still_path),
                width: 150,
              }}
              style={{
                //   aspectRatio: 16 / 9,
                height: "100%",
                borderRadius: 12,
                marginRight: 12,
              }}
            />
            <View
              style={{
                flex: 1,
                width: "100%",
              }}
            >
              <Text
                style={{
                  ...GlobalStyles.textWhite,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                Episode {ep.episode_number}
              </Text>
              <Text
                style={{
                  ...GlobalStyles.textWhite,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {ep.name}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,.5)",
                  fontSize: 10,
                }}
              >
                Season {ep.season_number}
              </Text>
              <Text
                numberOfLines={4}
                style={{
                  color: "rgba(255,255,255,.75)",
                  fontSize: 12,
                  flex: 1,
                  width: "100%",
                }}
              >
                {ep.overview}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
