import { MovieMedia } from "@movie-web/providers";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { providers } from "./src/scraper";
import { getConfigurationTMDB, getFromTMDB } from "./src/tmdb";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/pages/main";
import Player from "./src/pages/player";
import Movie from "./src/pages/movie";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // animation: "slide_from_right",
          headerShown: false,
          contentStyle:{
            backgroundColor:'rgb(10,10,18)'
          }
        }}
      >
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            orientation: "portrait",
          }}
        />
        <Stack.Screen
          name="Movie"
          component={Movie}
          options={{
            orientation: "portrait",
          }}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{ orientation: "landscape", }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
