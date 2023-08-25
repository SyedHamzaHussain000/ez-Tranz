import { View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import CustomButton from "../../Components/Button";
import CustomText from "../../Components/Text";
import { styles } from "./index.style";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../../Constants/theme";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import BassUrl from "../../BassUrl";

const GoThrough = ({ navigation }) => {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId: "YOUR_WEB_CLIENT_ID",
        offlineAccess: false,
      });
    } catch (error) {
      console.error("Google Sign-In Configuration Error:", error);
    }
  };
  const googleLogIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("user info", userInfo);

      const token = userInfo.idToken; // Assuming you need the ID token for your API
      const apiResponse = await callApi(token);

      console.log("API Response:", apiResponse);

      if (apiResponse.success) {
        navigation.navigate("Home");
      } else {
        alert("API Error: " + apiResponse.error);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Google Sign-In Cancelled", error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google Sign-In in Progress", error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available", error);
      } else {
        console.log("Error", error);
      }
    }
  };

  const callApi = async (token) => {
    try {
      const apiUrl = `${BassUrl}/api/social-media-register`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(apiUrl, {}, { headers });
      return response.data;
    } catch (error) {
      console.error("API Request Error", error);
      return { success: false, error: error.message };
    }
  };
  return (
    <FastImage source={images.Background} style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 25 }}>
        <View style={{ height: 120 }} />
        <View>
          <CustomText
            text={"The Magic of Instant Translation at Your Fingertips!"}
            style={styles.App_title_txt}
          />
          <CustomText
            text={"Sign In to your account"}
            style={styles.title_txt}
          />
          <TouchableOpacity
            onPress={() => googleLogIn()}
            style={[styles.container, { marginTop: 25 }]}
          >
            <Image source={images.Google_Icon} style={{ marginRight: 20 }} />
            <CustomText style={styles.txt} text={"Sign in with google"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <Image source={images.Facebook_Logo} style={{ marginRight: 20 }} />
            <CustomText style={styles.txt} text={"Sign in with facebook"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.container_Email}
          >
            <CustomText
              style={{ color: COLORS.text_white }}
              text={"Continue with email"}
            />
          </TouchableOpacity>
          <View style={styles.devider_View} />
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[styles.container, { marginTop: 30 }]}
          >
            <CustomText style={styles.txt} text={"Create an account"} />
          </TouchableOpacity>
        </View>
      </View>
    </FastImage>
  );
};

export default GoThrough;
