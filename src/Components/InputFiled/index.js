
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "../../Constants/Icons";
import Feather from "react-native-vector-icons/Feather";
import { COLORS } from "../../Constants/theme";


const InputField = ({
  style,
  placeholder,
  onChangeText,
  keyboardType,
  defaultValue,
  onFocus,
  onBlur,
  ref,
  isEdit,
  value,
  returnKeyType,
  multiline,
  textContentType,
  Lefticon,
  icon,
}) => {
  const [passwordHide, setpasswordHide] = useState(true);
  // console.log("passwordHide:", passwordHide);
  return (
    <View>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={icon ? passwordHide : false}
        style={[styles.input, style]}
        placeholderTextColor={"#949494"}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={isEdit}
        returnKeyType={returnKeyType}
        underlineColorAndroid="transparent"
        multiline={multiline}
        textContentType={textContentType}
      />
      {icon && (
        <TouchableOpacity
          style={styles.Righticon}
          onPress={() => setpasswordHide(!passwordHide)}
        >
          {passwordHide ? (
            <Feather name="eye" size={22} color={"gray"} />
          ) : (
            <Feather name="eye-off" size={22} color={"gray"} />
          )}
        </TouchableOpacity>
      )}
     
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 20,
    paddingHorizontal: 30,
    color: "black",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  Righticon: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 15,
    marginTop:20
  },
  Righticon: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 15,
    marginTop: 20,
  },
});

export default InputField;
