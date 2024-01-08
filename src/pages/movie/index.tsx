import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalStyles from "../../styles/global";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useState } from "react";
import tmdbInstance from "../../tmdb";
import Tv from "./Tv";

export default function Movie({ navigation, route }: any) {
  const { id, name, imageUrl, overview, type, releaseYear } = route.params;
  const [isLoading,setIsLoading] = useState(true);
  const [tvItem,setTvItem] = useState(null);

  const _handleWatchMovieType = () => {
    navigation.navigate("Player", {
      id,
      imageUrl,
      name,
      type,
      releaseYear,
    });
  };

  const _fetchTvItem = async () => {
    const result = await tmdbInstance.getTvItem(id);
    setIsLoading(false);
    setTvItem(result);
  };

  useEffect(() => {
    if(type == 'tv'){
        _fetchTvItem();
    }
  },[]);

  return (
    <ScrollView style={GlobalStyles.bgBlack}>
      <View
        style={{
          height: Dimensions.get("screen").height * .7,
          display: "flex",
          justifyContent: "flex-end",
          width:'100%',
          flex:1,
          alignItems: "flex-start",
          // padding: 24,
          // paddingVertical: 86,
          position: "relative",
        }}
      >
        {imageUrl && (
          <Image
          resizeMode="cover"
            source={{
              uri: imageUrl,
              width: Dimensions.get("screen").width,
              // height: 1000,
            }}
            style={{
              // position: "absolute",
              // height:'auto',
              flex:1,
              top: 0,
              left: 0,
            }}
          />
        )}
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(10,10,18,1)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: Dimensions.get("screen").width,
            flex: 1,
            height: Dimensions.get("screen").height * .6,
            // backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></LinearGradient>
      </View>
      <View
        style={{
          marginTop: -240,
          paddingHorizontal: 24,
          flexDirection: "column",
        }}
      >
        {/* <Image
          resizeMode="contain"
          source={{
            uri: imageUrl,
            width: 180,
          }}
          style={{
            borderRadius: 24,
            aspectRatio: 9 / 12,
          }}
        /> */}
        <Text
          style={{
            ...GlobalStyles.textWhite,
            fontSize: 32,
            textAlign: "center",
            fontWeight: "900",
            letterSpacing: -3,
            marginTop: 12,
            marginBottom: 12,
          }}
        >
          {name}
        </Text>
        {overview && !!overview.length && (
          <Text
            style={{
              color: "rgba(255,255,255,.65)",
              flex: 1,
              width: "100%",
              fontSize: 14,
              textAlign:'center'
            }}
          >
            {overview}
          </Text>
        )}
      </View>
      <View
        style={{
          padding: 24,
          marginVertical: 0,
        }}
      >
        {type == "movie" && (
          <TouchableOpacity onPress={_handleWatchMovieType}>
            <View
              style={{
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12,
                // backgroundColor:'#c082ff',
                borderColor: "#c082ff",
                borderWidth: 1,
                padding: 12,
              }}
            >
              <Text
                style={{
                  color: "#c082ff",
                  fontWeight: "bold",
                }}
              >
                Watch Now!
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {type == 'tv' && <Tv />}
      </View>
    </ScrollView>
  );
}
