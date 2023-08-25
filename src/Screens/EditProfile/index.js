import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import { styles } from "./index.style";
import BackButton from "../../Components/Back Button";
import CustomText from "../../Components/Text";
import CustomButton from "../../Components/Button";
import InputField from "../../Components/InputFiled";
import { useDispatch, useSelector } from "react-redux";
import {  updateUser } from "../../Redux/authSlice";
import Toast from "react-native-toast-message";
import BassUrl from "../../BassUrl";
import axios from "axios";
import { LoaderModal } from "../../Components";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [isLoader, setIsLoader] = useState(false);




  const token = useSelector((state) => state.data.token);

  console.log("user token >>>>>>>>>>>", token);

  const updateUserInfo = async () => {
    setIsLoader(true);
    let data = new FormData();
    data.append("name", name);

    console.log("emailllll", name);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BassUrl}/api/update-info`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoader(false);

        if (response.data.success === true) {
          dispatch(updateUser(response.data.data));

          showToast("success", response.data.message);
          console.log(JSON.stringify(response.data));
          navigation.navigate("Profile");
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
  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };
  const emptyStats = () => {};
  return (
    <FastImage source={images.Background} style={{ flex: 1 }}>
      <View style={styles.main_container}>
        <BackButton onPressBack={() => navigation.goBack()} />
        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          <Image
            source={images.logo}
            style={{ height: 70, width: 70, alignSelf: "center" }}
          />
          <CustomText text={"Edit Profile"} style={styles.title} />
          <View style={styles.name_view}>
            <InputField
              placeholder={"Name"}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          {isLoader  ? (
            <LoaderModal/>
          ):(

          <CustomButton
            buttonText={"Submit"}
            onPress={() => updateUserInfo()}
          />
          )}
        </View>
      </View>
      <Toast/>
    </FastImage>
  );
};

export default EditProfile;
