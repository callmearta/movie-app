import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useDebounce from "../../hooks/useDebounce";
import { getConfigurationTMDB, getFromTMDB } from "../../tmdb";
import useConfig from "../../hooks/useConfig";
import Movie from "../../components/movie/movie";
import MovieImage from "../../components/movie/movieImage";
import { MainContextProvider } from "../../context/mainContext";
import Content from "./content";
import GlobalStyles from "../../styles/global";
import { BlurView } from "@react-native-community/blur";

const Main = ({ navigation }: any) => {
  const [results, setResults] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debounce = useDebounce(name, 500);
  const config = useRef(null);

  const _fetchTitles = async (name: string) => {
    setIsLoading(true);
    const result = await getFromTMDB(name);
    setResults(
      result.results.filter(
        (v: any) => v.media_type == "tv" || v.media_type == "movie"
      )
    );
    setIsLoading(false);
  };

  useEffect(() => {
    _fetchTitles(debounce);
  }, [debounce]);

  const _handleChange = (newValue: string) => {
    setName(newValue);
  };

  return (
    <MainContextProvider>
      <SafeAreaView style={GlobalStyles.bgBlack}>
        <StatusBar />

        <View
          style={{
            position: "relative",
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
            backgroundColor: "rgb(20,20,20)"
          }}
        >
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150,
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(255,255,255)",
            }}
          ></View>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 150,
              position: "absolute",
              bottom: 0,
              right: 50,
              backgroundColor: "rgb(22,22,22)",
            }}
          ></View>
          {/* <BlurView
            style={{
              position: "absolute",
              backgroundColor: "rgba(20,20,20,.4)",
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
            }}
            blurType="dark"
            blurAmount={20}
            overlayColor="transparent"
          > */}
            <ScrollView
              style={{
                // ,
                width: "100%",
                minHeight: Dimensions.get("screen").height,
              }}
              contentInsetAdjustmentBehavior="automatic"
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 36,
                }}
              >
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        ...GlobalStyles.textWhite,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Hello
                    </Text>
                    <Text
                      style={{
                        ...GlobalStyles.textWhite,
                        marginLeft: 3,
                        fontSize: 16,
                      }}
                    >
                      dude!
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: "rgba(255,255,255,.5)",
                    }}
                  >
                    Watch your favourite movie!
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: "rgba(255,255,255,.1)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "#3EA2FF",
                      position: "relative",
                      top: -2,
                    }}
                  >
                    A
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 36,
                  position: "relative",
                  marginBottom:24
                }}
              >
                <Image
                  source={require("../../assets/icons/search.png")}
                  style={{
                    position: "absolute",
                    left: 18,
                    top: 14,
                    width: 18,
                    height: 18,
                    bottom: 0,
                  }}
                />
                <TextInput
                  placeholder="Type a movie or tv show name"
                  placeholderTextColor={"rgba(255,255,255,.4)"}
                  style={{
                    // borderColor: "#333",
                    backgroundColor: "rgba(255,255,255,.1)",
                    // borderWidth: 1,
                    borderRadius: 12,
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    paddingLeft: 48,
                    width: "100%",
                    color: "#FFF",
                    textDecorationColor: "#FFF",
                  }}
                  value={name}
                  onChangeText={_handleChange}
                />
              </View>
              {isLoading && (
                <ActivityIndicator
                  color={"#FFF"}
                  style={{
                    marginVertical: 24,
                  }}
                />
              )}
              {!isLoading && <Content data={results} />}
            </ScrollView>
          {/* </BlurView> */}
        </View>
      </SafeAreaView>
    </MainContextProvider>
  );
};

export default Main;
