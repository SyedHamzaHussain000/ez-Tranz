import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "./index.style";
import CustomText from "../../Components/Text";
import InputField from "../../Components/InputFiled";
import CustomButton from "../../Components/Button";
import { RadioButton } from "react-native-paper";
import BackButton from "../../Components/Back Button";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import { COLORS } from "../../Constants/theme";
import axios from "axios";
import BassUrl from "../../BassUrl";
import Toast from "react-native-toast-message";
import { LoaderModal } from "../../Components";

const SignUp = ({ navigation }) => {
  const [checked, setChecked] = useState("first");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const RegisterUser = async () => {
    setIsLoader(true);
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BassUrl}/api/register`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);
        if (response.data.success === true) {
          showToast("success", response.data.message);
          console.log(JSON.stringify(response.data));
          navigation.navigate("Login");
          emptyStats();
        } else {
          setIsLoader(false);
          console.log("credentials are not valid");
        }
      })
      .catch((error) => {
        setIsLoader(false);

        showToast("error", "Field Cannot be Empty");
        console.log(error.message);
      });
  };
  const emptyStats = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };
  return (
    <FastImage source={images.Background} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <BackButton onPressBack={() => navigation.goBack()} />
        <Image
          source={images.logo}
          style={{ height: 70, width: 70, alignSelf: "center", marginTop: 20 }}
        />

        <View style={styles.main_container}>
          <View style={styles.container}>
            <CustomText
              text={"Create an account"}
              style={styles.screen_title}
            />
            <InputField
              placeholder={"Full Name"}
              value={name}
              onChangeText={setName}
            />
            <InputField
              placeholder={"Email Address"}
              value={email}
              onChangeText={setEmail}
            />
            <InputField
              placeholder={"password"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <InputField
              placeholder={"Re-type Password"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <View style={styles.checkView}>
              <RadioButton
                value="first"
                color={COLORS.primary}
                uncheckedColor="#949494"
                status={checked === "first" ? "checked" : "unchecked"}
              />
              <CustomText
                text={"I have read and accept the "}
                style={styles.termsText}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("TermsAndConditions", {navigatedFrom:'TermsAndConditions'})}
              >
                <CustomText
                  text={"terms and conditions"}
                  style={styles.termsTxt}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 30 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("TermsAndConditions", {navigatedFrom:'Privacypolicy'})}
              >
                <CustomText text={"Privacy Policy"} style={styles.termsTxt} />
              </TouchableOpacity>
            </View>
            {isLoader ? (
              <LoaderModal />
            ) : (
              <CustomButton
                onPress={() => RegisterUser()}
                buttonText={"Create an account"}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <Toast />
    </FastImage>
  );
};

export default SignUp;
