import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import CustomText from "../../Components/Text";
import { styles } from "./index.style";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { COLORS } from "../../Constants/theme";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../Redux/languageSlice";
import FlagsData from "../../Config/index";

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleCountryFlagClick = (selectedLanguage) => {
    dispatch(setLanguage(selectedLanguage));
    navigation.navigate("Translations");
  };

  const filteredFlagsData = FlagsData.filter((item) =>
    item.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FastImage source={images.Background} style={{ flex: 1 }}>
      <View
        style={{ alignItems: "flex-end", marginHorizontal: 20, marginTop: 15 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Octicons name={"person"} size={35} color={COLORS.text_white} />
        </TouchableOpacity>
      </View>
      <View style={styles.main_container}>
        <CustomText
          text={"Choose Mother Language"}
          style={styles.screen_title}
        />
        <View style={styles.Search_field}>
          <TextInput
            placeholder="Search here.."
            placeholderTextColor={"#949494"}
            onChangeText={(text) => setSearchQuery(text)}
          ></TextInput>
          <EvilIcons name={"search"} size={25} color={"#949494"} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredFlagsData}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlist_container}>
                <View style={styles.card}>
                  <TouchableOpacity
                    onPress={() => {
                      handleCountryFlagClick(item.language);
                    }}
                  >
                    <Image source={item.image} style={styles.flag_container} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </FastImage>
  );
};

export default Home;
