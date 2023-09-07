import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./index.style";
import CustomText from "../../Components/Text";
import InputField from "../../Components/InputFiled";
import CustomButton from "../../Components/Button";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import axios from "axios";
import BassUrl from "../../BassUrl";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../Redux/authSlice";
import { LoaderModal } from "../../Components";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useDispatch();

  // const loader = useSelector((state) => state.data.isLoading);
  // console.log('loderrrrrrrrrrrrrrrrrrrrrrrrrr', loader)

  const loginUser = async () => {
    setIsLoader(true);
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    console.log("emailllll", email, password);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BassUrl}/api/login`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    dispatch(UserLogin(config));
    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);
        if (response.data.success === true) {
          showToast("success", response.data.message);
          console.log(JSON.stringify(response.data));
          emptyStats();
        } else {
          console.log("credentials are not valid");
        }
      })
      .catch((error) => {
        showToast("error", error.data.message);
        setIsLoader(false);
        console.log(error);
        emptyStats();
      });
  };
  //empty stats
  const emptyStats = () => {
    setEmail("");
    setPassword("");
  };
  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };

  return (
    <>
      <FastImage source={images.Background} style={{ flex: 1 }}>
        <Image
          source={images.logo}
          style={{ height: 70, width: 70, alignSelf: "center", marginTop: 40 }}
        />

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.main_container}>
            <View style={styles.container}>
              <CustomText
                text={"Sign In with email or username"}
                style={styles.screen_title}
              />
              <InputField
                placeholder={"username or email"}
                value={email}
                onChangeText={setEmail}
                keyboardType={"email-address"}
              />
              <InputField
                placeholder={"password"}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
                style={{ alignSelf: "flex-end", marginTop: 10 }}
              >
                <CustomText
                  text={"forgot password?"}
                  style={{ fontSize: 14 }}
                />
              </TouchableOpacity>
              {isLoader ? (
                <LoaderModal />
              ) : (
                <CustomButton
                  buttonText={"Sign In"}
                  onPress={() => {
                    loginUser();
                  }}
                />
              )}

              {/* {isLoading && <ActivityIndicator size={80} color="gray" />} */}
              <View style={styles.devider_View} />

              <TouchableOpacity style={{ alignSelf: "center", marginTop: 10 }}>
                <CustomText
                  text={"Dont have an account?"}
                  style={{ fontSize: 14 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                style={[styles.container_create, { marginTop: 30 }]}
              >
                <CustomText style={styles.txt} text={"Create an account"} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </FastImage>
      <Toast />
    </>
  );
};

export default Login;
