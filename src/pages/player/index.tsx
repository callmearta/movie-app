import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Video from "react-native-video";
import VideoPlayer from "./VideoPlayer";
import { MovieMedia, ShowMedia } from "@movie-web/providers";
import { providers } from "../../scraper";

const Player = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState(null);
  const {
    name,
    id,
    releaseYear,
    episodeNumber,
    episodeTmdbId,
    seasonNumber,
    seasonTmdbId,
  } = route.params;

  const _fetchMedia = async (name: string, id: string, releaseYear: number) => {
    setIsLoading(true);
    
    let media: MovieMedia | ShowMedia;
    if (!episodeNumber) {
      media = {
        type: "movie",
        title: name,
        releaseYear: Number(releaseYear),
        tmdbId: id,
      };
    } else {
      media = {
        type: "show",
        episode: {
          number: episodeNumber,
          tmdbId: episodeTmdbId,
        },
        season: {
          number: seasonNumber,
          tmdbId: seasonTmdbId,
        },
        title: name,
        releaseYear: Number(releaseYear),
        tmdbId: id,
      };
    }

    const output = await providers.runAll({
      media: media,
      events: {
        // discoverEmbeds: (e) => {
        //   console.log(e);
        // },
        // start: (e) => {
        //   console.log("start", e);
        // },
        // update: (e) => {
        //   console.log("update", e);
        // },
      },
    });

    setSource((output?.stream as any).playlist);
    setIsLoading(false);
  };

  useEffect(() => {
    _fetchMedia(name, id, releaseYear);
  }, []);

  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "#000",
      }}
    >
      <StatusBar hidden />
      {isLoading ? (
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "rgb(10,10,18)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color="#FFF" size={48} />
        </View>
      ) : (
        source && <VideoPlayer source={source} />
      )}
    </View>
  );
};

export default Player;
