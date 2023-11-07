import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
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
import { useSelector } from "react-redux";
import { turnSneakPeekState } from "../../Redux/authSlice";
import { Text } from "react-native-paper";

const Home = ({ navigation }) => {
  const {sneakPeek} = useSelector(state => state.data);
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
            style={sneakPeek ? { flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginHorizontal: 20, marginTop: 15} : {marginVertical: 30, marginRight: 20}}
          >
            {
              sneakPeek ? (
                <TouchableOpacity  onPress={() => dispatch(turnSneakPeekState(false))} style={{borderWidth: 2, borderColor: 'white', padding: 6, borderRadius: 5}}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Sign Up</Text>
                </TouchableOpacity>
              ) : null
            }
            
            <TouchableOpacity style={!sneakPeek ? {position:'absolute', right: 0, top: 10} : null} onPress={() => {
              if(!sneakPeek){
                navigation.navigate("Profile")
              }else {
                Alert.alert(
                  "Can't use this feature in sneak peek mode 🥲",
                  "Sign up or Login to use this language 🙂",
                  [
                    {
                      text: "Stay in this mode",
                      style: "cancel"
                    },
                    { text: "Sign up", onPress: () => {
                      dispatch(turnSneakPeekState(false))
                    }}
                  ]
                );
              }
            }}>
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
          renderItem={({ item, index }) => {
            return (
              <View style={styles.flatlist_container}>
                <View style={styles.card}>
                  <TouchableOpacity
                    onPress={() => {
                      if(sneakPeek){
                        if(index <= 2){
                          handleCountryFlagClick(item.language);
                        }else {
                          Alert.alert(
                            "Can't use this feature in sneak peek mode 🥲",
                            "Sign up or Login to use this language 🙂",
                            [
                              {
                                text: "Stay in this mode",
                                style: "cancel"
                              },
                              { text: "Sign up", onPress: () => {
                                dispatch(turnSneakPeekState(false))
                              }}
                            ]
                          );
                        }
                      }else {
                        handleCountryFlagClick(item.language);
                      }
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
