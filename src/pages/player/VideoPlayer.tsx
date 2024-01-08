import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  PanResponder,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Video, { ResizeMode } from "react-native-video";
import GlobalStyles from "../../styles/global";
import { useNavigation } from "@react-navigation/native";

const VideoPlayer = ({ source }: any) => {
  const videoRef = useRef<any>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [timeData, setTimeData] = useState<{
    currentTime: number;
    playableDuration: number;
  }>({
    currentTime: 0,
    playableDuration: 0,
  });
  const [totalTime, setTotalTime] = useState(0);
  const [videoData, setVideoData] = useState(null);
  const [seekPos, setSeekPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const seekerWidth = useRef<number>(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const hideOverlayTimeout = useRef<any>(null);

  const panResponder = () => {
    const pan = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        setSeekPos((prev) => prev + gestureState.dx);
      },
      onPanResponderStart: (e) => {
        setPaused(true);
        setIsScrubbing(true);
        if (hideOverlayTimeout.current) {
          clearTimeout(hideOverlayTimeout.current);
        }
      },
      onPanResponderEnd: (e, gestureState) => {
        const percent = (seekPos * 100) / seekerWidth.current;
        videoRef.current.seek((percent * totalTime) / 100);
        setIsScrubbing(false);
        setPaused(false);
        hideOverlayTimeout.current = setTimeout(() => {
          setShowOverlay(false);
        }, 2500);
      },
      onPanResponderGrant: (evt, gestureState) => {},
    });
    return pan;
  };

  const _handleProgress = useCallback(
    (e: any) => {
      // console.log(e);
      if (!e) return;
      setTimeData({
        currentTime: e.currentTime,
        playableDuration: e.playableDuration,
      });
      if (!isScrubbing) {
        const percent = (e.currentTime * 100) / totalTime;
        setSeekPos((percent * seekerWidth.current) / 100);
      }
    },
    [totalTime, isScrubbing, seekerWidth]
  );

  const _handleLoad = (e: any) => {
    if (!e) return;
    setTotalTime(e.duration);
    setVideoData(e);
    setLoading(false);
  };

  const _handleShowOverlay = () => {
    if (hideOverlayTimeout.current) {
      clearTimeout(hideOverlayTimeout.current);
    }
    setShowOverlay((prev) => !prev);
    hideOverlayTimeout.current = setTimeout(() => {
      setShowOverlay(false);
    }, 2500);
  };

  return (
    <>
      <StatusBar hidden />

      {(showOverlay || paused) && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            zIndex: 9,
            padding: 12,
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 12,
              paddingHorizontal: 24,
              backgroundColor: "rgba(0,0,0,0.35)",
              marginVertical: 12,
              borderRadius: 12,
            }}
          >
            <View>
              <Text
                onPress={() => navigation.goBack()}
                style={{
                  ...GlobalStyles.textWhite,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Back
              </Text>
            </View>
            <View></View>
          </View>
          <View
            style={{
              width: "100%",
              flex: 1,
              // backgroundColor: "rgba(0,0,0,0.1)",
              marginVertical: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // height: Dimensions.get("window").height / 4,
            }}
          >
            <Text
              style={{
                ...GlobalStyles.textWhite,
                fontSize: 24,
                fontWeight: "bold",
              }}
              onPress={() => setPaused((prev) => !prev)}
            >
              {paused ? "PLAY" : "PAUSE"}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 48,
              marginVertical: 12,
              backgroundColor: "rgba(0,0,0,0.35)",
              borderRadius: 12,
              alignItems: "center",
              paddingHorizontal: 12,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginRight: 12,
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TouchableHighlight
                onPress={() => videoRef.current.seek(timeData.currentTime - 15)}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,.5)",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    -15
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => videoRef.current.seek(timeData.currentTime + 15)}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,.5)",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  >
                    +15
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                width: "80%",
              }}
            >
              <View
                onLayout={(event) =>
                  (seekerWidth.current = event.nativeEvent.layout.width)
                }
                style={{
                  position: "relative",
                  width: "100%",
                  height: 4,
                  backgroundColor: "rgba(255,255,255,.15)",
                  borderRadius: 12,
                }}
              >
                <View
                  {...panResponder().panHandlers}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 100,
                    backgroundColor: "#FFF",
                    elevation: 1,
                    position: "absolute",
                    // right: 10 - seekDx,
                    left: seekPos,
                    top: -8,
                  }}
                ></View>
                <View
                  style={{
                    position: "absolute",
                    borderRadius: 12,
                    top: 0,
                    left: 0,
                    width: `${(timeData.playableDuration * 100) / totalTime}%`,
                    height: 4,
                    backgroundColor: "rgba(255,255,255,.4)",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                ></View>
                <View
                  style={{
                    position: "absolute",
                    borderRadius: 12,
                    top: 0,
                    left: 0,
                    width: `${(timeData.currentTime * 100) / totalTime}%`,
                    height: 4,
                    backgroundColor: "#FFF",
                  }}
                ></View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 12,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                {isScrubbing ? (
                  <>
                  {(((seekPos * 100) / seekerWidth.current * totalTime) / 100 / 60).toFixed(0)}:
                    {(((seekPos * 100) / seekerWidth.current * totalTime) / 100 % 60).toFixed(0)}
                    </>
                ) : (
                  <>
                    {(timeData.currentTime / 60).toFixed(0)}:
                    {(timeData.currentTime % 60).toFixed(0)}
                  </>
                )}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,.65)",
                  fontSize: 12,
                  marginHorizontal: 4,
                }}
              >
                /
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,.65)",
                  fontSize: 12,
                }}
              >
                {(totalTime / 60).toFixed(0)}:{(totalTime % 60).toFixed(0)}
              </Text>
            </View>
          </View>
        </View>
      )}
      {loading && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9,
          }}
        >
          <ActivityIndicator size={48} color={"#FFF"} />
        </View>
      )}
      <TouchableOpacity
        onPress={_handleShowOverlay}
        style={styles.backgroundVideo}
        activeOpacity={1}
      >
        <Video
          source={{ uri: source, type: "m3u8" }}
          // onTouchStart={_handleShowOverlay}
          ref={videoRef}
          onLoad={_handleLoad}
          onProgress={_handleProgress}
          resizeMode={ResizeMode.CONTAIN}
          paused={paused}
          fullscreen
          style={styles.backgroundVideo}
        />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
});
export default VideoPlayer;
