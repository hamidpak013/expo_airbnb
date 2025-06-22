import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  const router = useRouter();


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: "modal",
          title: "Log in or sign up",
          headerTitleStyle: {
            fontFamily: "mon-sb",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ padding: 10 }}
            >
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitle: "nice to meet you",
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
       <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: 'fade',
             headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
        
        />
    </Stack>
  );
}
