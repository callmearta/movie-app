import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalStyles from "../../styles/global";
import { useEffect, useMemo, useState } from "react";
import tmdbInstance from "../../tmdb";
import Episodes from "./Episodes";

export default function Seasons({ item }: any) {
  const [activeSeasonIndex, setActiveSeasonIndex] = useState(0);
  const seasons = useMemo(() => item?.seasons, [item]);
  const [seasonData, setSeasonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const _handleSeasonChange = async (seasonIndex: number) => {
    setActiveSeasonIndex(seasonIndex);

    setIsLoading(true);
    const seasonData = await tmdbInstance.getTvItemEpisodes(
      item.id,
      item.seasons[seasonIndex].season_number
    );
    setSeasonData(seasonData);
    
    setIsLoading(false);
  };
  useEffect(() => {
    if (!item || !seasons) return;
    _handleSeasonChange(0);
  }, [item, seasons]);
  return (
    <>
      <ScrollView
        horizontal={true}
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          marginRight: -24,
          marginLeft: -24,
          paddingHorizontal: 12,
          overflow: "scroll",
        }}
      >
        {seasons?.map((s: any, index: number) => (
          <TouchableOpacity
            key={s.id}
            onPress={() => _handleSeasonChange(index)}
          >
            <View
              style={{
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 24,
                backgroundColor:
                  activeSeasonIndex == index
                    ? "transparent"
                    : "rgba(255,255,255,.1)",
                borderWidth: 1,
                marginHorizontal: 5,
                borderColor:
                  activeSeasonIndex == index ? "#FD96A9" : "transparent",
              }}
            >
              <Text style={GlobalStyles.textWhite}>{s.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View
          style={{
            width: 50,
            height: 10,
          }}
        ></View>
      </ScrollView>
      {isLoading && (
        <ActivityIndicator
          style={{
            marginVertical: 36,
          }}
          color="rgba(255,255,255,.5)"
        />
      )}
      {seasonData && !isLoading && (
        <>
          <View
            style={{
              flexDirection: "row",
              marginTop: 24,
              marginBottom: 12,
            }}
          >
            {seasonData.poster_path && !!seasonData.poster_path.length && (
              <Image
                source={{
                  uri: tmdbInstance.constructImageUrl(seasonData.poster_path),
                  width: 110,
                }}
                style={{
                  aspectRatio: 9 / 12,
                  borderRadius: 12,
                }}
              />
            )}
            <Text
              style={{
                ...GlobalStyles.textWhite,
                color: "rgba(255,255,255,.75)",
                fontSize: 12,
                width: "100%",
                flex: 1,
                paddingLeft: 12,
              }}
              numberOfLines={10}
            >
              {seasonData.overview}
            </Text>
          </View>
          <Episodes seasonData={seasonData} movieData={item} />
        </>
      )}
    </>
  );
}
