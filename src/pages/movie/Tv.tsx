import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import tmdbInstance from "../../tmdb";
import GlobalStyles from "../../styles/global";
import Seasons from "./Seasons";

export default function Tv() {
  const route = useRoute();
  // @ts-ignore
  const { id, name, imageUrl, overview, type, releaseYear } = route.params;
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const _fetchData = async () => {
    const result = await tmdbInstance.getTvItem(id);
    setLoading(false);
    
    setItem(result);
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <View>
      {loading && (
        <View
          style={{
            marginVertical: 36,
            width:'100%',
            height:200,
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <ActivityIndicator color="rgba(255,255,255,.5)" />
        </View>
      )}
      <Seasons item={item} />
    </View>
  );
}
