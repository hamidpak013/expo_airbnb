import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  GOOGLE = "oauth_google",
  APPLE = "oauth_apple",
  FACEBOOK = "oauth_facebook",
}
const Page = () => {
  const router = useRouter()
  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: appleAuth } = useOAuth({
    strategy: "oauth_apple",
  });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook", 
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.GOOGLE]: googleAuth,
      [Strategy.APPLE]: appleAuth,
      [Strategy.FACEBOOK]: facebookAuth,
    }[strategy];
    try {
      const {createdSessionId, setActive} = await selectedAuth();
      console.log("createdSessionId", createdSessionId);
      if (createdSessionId) {
         setActive?.({ session: createdSessionId });
         router.back();
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={[defaultStyles.inputfield, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#ABABAB",
            marginVertical: 20,
          }}
        />
        <Text style={styles.separator}>or</Text>
        <View
          style={{
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#ABABAB",
            marginVertical: 20,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons
            name="call-outline"
            size={24}
            color="#000"
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.APPLE)}>
          <Ionicons
            name="logo-apple"
            size={24}
            color="#000"
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Sign in with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.GOOGLE)}>
          <Ionicons
            name="logo-google"
            size={24}
            color="#000"
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.FACEBOOK)}>
          <Ionicons
            name="logo-facebook"
            size={24}
            color="#000"
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Sign in with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },
  separator: {
    fontFamily: "mon-sb",
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#FFFFFF",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
export default Page;
