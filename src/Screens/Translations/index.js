import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import images from "../../Constants/images";
import BackButton from "../../Components/Back Button";
import CustomText from "../../Components/Text";
import { styles } from "./index.style";
import { COLORS } from "../../Constants/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

import axios from "axios";
import Toast from "react-native-toast-message";
import { Clipboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { WaveLoader } from "../../Components";
import Modal from "react-native-modal";
import CustomButton from "../../Components/Button";
import FlagsData from "../../Config/index";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";

const Translations = ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const [translations, setTranslations] = useState([]);

  const [myLoader, setMyLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const dispatch = useDispatch();

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const GOOGLE_TRANSLATE_API_KEY = "AIzaSyAQq8xavOwRXwMck2erWLGysH0Q13uRJTY";

  const handleTranslationApi = async (text, targetLanguages) => {
    setMyLoader(true);

    const translations = await Promise.all(
      targetLanguages.map(async (language) => {
        try {
          const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
            {
              q: text,
              target: language,
            }
          );

          if (
            response.data &&
            response.data.data &&
            response.data.data.translations &&
            response.data.data.translations.length > 0
          ) {
            return {
              language,
              translatedText: response.data.data.translations[0].translatedText,
            };
          }
        } catch (error) {
          return { language, translatedText: "Translation error" };
        }
      })
    );

    setMyLoader(false);
    return translations;
  };

  const handleTranslate = async () => {
    if (inputText) {
      setTranslations([]);

      let translatedText = await handleTranslationApi(
        inputText,
        selectedLanguages,
        GOOGLE_TRANSLATE_API_KEY
      );
      setTranslations(translatedText);
    } else if (!inputText) {
      showToast("error", "Put your Words for translation");
    }
  };

  const showToast = (type, msg) => {
    Toast.show({
      type: type,
      text1: msg,
    });
  };
  const handleCopy = () => {
    Clipboard.setString(inputText);

    showToast("success", "Text Added To ClipBoard");
  };
  const handleClearInput = () => {
    setInputText("");
    setTranslations([]);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleItemSelection = (itemId, short_form) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== itemId)
      );
      setSelectedLanguages((prevSelectedLanguage) =>
        prevSelectedLanguage.filter((shortForm) => shortForm !== short_form)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
      setSelectedLanguages((prevSelectedLanguage) => [
        ...prevSelectedLanguage,
        short_form,
      ]);
    }
  };

  const renderCountries = (item) => {
    let printedObjectCountries = [];
    return FlagsData.map((eachData, index) => {
      if (
        eachData.short_form === item.language &&
        !printedObjectCountries.includes(eachData.id)
      ) {
        printedObjectCountries.push(eachData.id);

        return (
          <CustomText
            text={eachData.country}
            style={{ color: "#949494" }}
            key={eachData.country}
          />
        );
      }
    });
  };

  return (
    <FastImage source={images.Background} style={{ flex: 1 }}>
      <View style={styles.main_container}>
        <View style={styles.header}>
          <BackButton onPressBack={() => navigation.goBack()} />
          <View
            style={{ backgroundColor: "white", borderRadius: 6, marginTop: 15 }}
          >
            <TouchableOpacity onPress={() => toggleModal()}>
              <Ionicons
                name={"globe-outline"}
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card_view}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              height: 35,
            }}
          >
            <CustomText text={selectedLanguage} style={{ color: "#949494" }} />
            <TouchableOpacity onPress={() => handleClearInput()}>
              <Ionicons name={"chevron-down"} size={20} color={"#949494"} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, backgroundColor: "#949494" }}></View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.Search_field}>
              <TextInput
                value={inputText}
                placeholder="Search here to translate"
                placeholderTextColor={"#949494"}
                onChangeText={(text) => setInputText(text)}
                multiline={true}
              ></TextInput>
            </View>
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity onPress={() => handleClearInput()}>
                <Ionicons name={"close"} size={25} color={"#949494"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: "#949494" }}></View>
          <View
            style={{
              alignItems: "flex-end",
              alignContent: "center",
              justifyContent: "space-between",
              height: 35,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleTranslate();
              }}
            >
              <Ionicons name={"search"} size={25} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCopy()}>
              <Feather name={"copy"} size={20} color={"#949494"} />
            </TouchableOpacity>
          </View>
        </View>
        {translations.length <= 0 ? (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <CustomText
              text={"select languages to translate "}
              style={{ color: "black", fontSize: 16 }}
            />
          </View>
        ) : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={translations}
          style={{ bottom: 0 }}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlist_container}>
                <View style={styles.card_view}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      height: 35,
                    }}
                  >
                    <CustomText
                      text={item.language}
                      style={{ color: "#949494" }}
                    />
                    {/* {renderCountries(item)} */}
                    <Ionicons
                      name={"chevron-down"}
                      size={20}
                      color={"#949494"}
                    />
                  </View>
                  <View
                    style={{ height: 1, backgroundColor: "#949494" }}
                  ></View>
                  <View style={styles.Search_field}>
                    <CustomText
                      text={item.translatedText}
                      style={{ color: COLORS.text_placeholder }}
                    />
                  </View>
                  <View
                    style={{ height: 1, backgroundColor: "#949494" }}
                  ></View>
                  <View
                    style={{
                      alignItems: "flex-end",
                      alignContent: "center",
                      justifyContent: "center",
                      height: 35,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Clipboard.setString(item.translatedText);
                      }}
                    >
                      <Feather name={"copy"} size={20} color={"#949494"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          ListFooterComponent={() => {
            if (myLoader) {
              return <WaveLoader />;
            }
          }}
        />

        <Modal isVisible={isModalVisible}>
          <FastImage
            source={images.Background}
            style={{ flex: 0.9, borderRadius: 10 }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginTop: 10,
                marginHorizontal: 10,
              }}
              onPress={() => toggleModal()}
            >
              <AntDesign name={"close"} size={30} color={"#fff"} />
            </TouchableOpacity>
            <CustomText
              text={"Select Languages to translate"}
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 15,
                alignSelf: "center",
                bottom: 10,
              }}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={FlagsData}
              numColumns={3}
              // key={(item)=> item.id }
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const isChecked = selectedItems.includes(item.id);
                return (
                  <View style={styles.flatlist_container}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        toggleItemSelection(item.id, item.short_form)
                      }
                      style={[
                        styles.card_,
                        isChecked
                          ? { borderColor: "red", borderWidth: 2.5 }
                          : null,
                      ]}
                    >
                      <Image
                        source={item.image}
                        style={styles.flag_container_list}
                        // resizeMode="repeat"
                      />
                      {/* <CustomText
                        text={item.country}
                        style={{ color: "#949494" }}
                      /> */}
                    </TouchableOpacity>
                  </View>
                );
              }}
            />

            <CustomButton
              onPress={() => {
                handleTranslate(), toggleModal();
              }}
              buttonText={"Submit"}
              style={{ bottom: 20, width: "85%" }}
            />
          </FastImage>
        </Modal>
      </View>
    </FastImage>
  );
};

export default Translations;
