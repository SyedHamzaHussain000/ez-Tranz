import { View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import CustomText from "../../Components/Text";
import { styles } from "./index.style";
import { COLORS } from "../../Constants/theme";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import BassUrl from "../../BassUrl";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../Redux/authSlice";
import axios from "axios";
import { LoaderModal } from "../../Components";

const GoThrough = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);
  //  google login
  const configureGoogleSignIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId: "YOUR_WEB_CLIENT_ID",
        offlineAccess: true,
      });
    } catch (error) {
      console.error("Google Sign-In Configuration Error:", error);
    }
  };
  const googleLogIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("user info >>>>>>>>>", userInfo);

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BassUrl}/api/social-media-register`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(UserLogin(config));
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

  //  fb login

  const onFacebookButtonPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
        "openid",
      ]);
      setIsLoader(true);

      console.log("resultlll >>>>>>>>", result.grantedPermissions);
      const firstPermission = result.grantedPermissions[2];
      console.log("resultlll >>>>>>>>", firstPermission);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }
      // console.log("resultttttt  >>>>>>>", result.grantedPermissions.email);
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      console.log(" facebookCredential >>>>>>>", facebookCredential.token);

      await auth()
        .signInWithCredential(facebookCredential)
        .then((res) => {
          console.log(
            "emailllllllllllllllllll.......................................................",
            res.user.photoURL
          );

          fetchUserData(facebookCredential?.token, res.user.photoURL);
        });

      console.log("emailllllllllllllllllll", result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async (accessToken) => {
    setIsLoader(true);
    try {
      const response = await axios.get(`https://graph.facebook.com/v15.0/me`, {
        params: {
          fields: "id,name,email", // Specify the fields you want to retrieve
          access_token: accessToken,
        },
      });

      if (response.status === 200) {
        setIsLoader(true);

        const userData = response.data;
        const { id, name, email } = userData;
        console.log(`User ID: ${id}`);
        console.log(`User Name: ${name}`);
        console.log(`User Email: ${email}`);

        // console.log(
        //   "............................===============...................",
        //   userData.email
        // );

        if (userData.email) {
          setIsLoader(true);

          let data = new FormData();
          data.append("email", userData?.email);
          data.append("name", userData?.name);

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url:
              "https://customdemo.website/apps/tranz/public/api/social-media-register",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: data,
          };
          dispatch(UserLogin(config));

          axios
            .request(config)
            .then((response) => {
              setIsLoader(true);
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              setIsLoader(false);

              console.log(error);
            });
        }
      } else {
        throw new Error(
          `Failed to fetch user data. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchUserData = async (accessToken, imageUrl) => {
  //   try {
  //     const response = await axios.get(`https://graph.facebook.com/v15.0/me`, {
  //       params: {
  //         fields: "id,name,email", // Specify the fields you want to retrieve
  //         access_token: accessToken,
  //       },
  //     });

  //     if (response.status === 200) {
  //       const userData = response.data;

  //       const { id, name, email, photoURL } = userData;
  //       console.log(`User ID: ${id}`);
  //       console.log(`User Name: ${name}`);
  //       console.log(`User Email: ${email}`);
  //       console.log(`User photoURL: ${imageUrl}`);

  //       // Create FormData and append user data
  //       const data = new FormData();
  //       data.append("email", email);
  //       data.append("name", name);
  //       data.append("profile_image", imageUrl); // Include the profile image URL

  //       const config = {
  //         method: "post",
  //         maxBodyLength: Infinity,
  //         url:
  //           "https://customdemo.website/apps/tranz/public/api/social-media-register",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         data: data,
  //       };

  //       // Dispatch your Redux action here if needed
  //       dispatch(UserLogin(config));

  //       axios
  //         .request(config)
  //         .then((response) => {
  //           console.log(JSON.stringify(response.data));
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } else {
  //       console.error(
  //         `Failed to fetch profile picture. Status code: ${profilePictureResponse.status}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
          {isLoader ? (
            <LoaderModal />
          ) : (
            <TouchableOpacity
              onPress={() => onFacebookButtonPress()}
              style={styles.container}
            >
              <Image
                source={images.Facebook_Logo}
                style={{ marginRight: 20 }}
              />
              <CustomText style={styles.txt} text={"Sign in with facebook"} />
            </TouchableOpacity>
          )}
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
