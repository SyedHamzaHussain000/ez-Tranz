import React from "react";
import { StyleSheet, TextInput } from "react-native";


const InputField = ({
  style,
  placeholder,
  onChangeText,
  secureText,
  keyboardType,
  defaultValue,
  onFocus,
  onBlur,
  ref,
  isEdit,
  value,
  returnKeyType,
  multiline,
  textContentType
}) => {
  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      secureTextEntry={secureText}
      style={[styles.input, style]}
      placeholderTextColor={'#949494'}
      defaultValue={defaultValue}
      onFocus={onFocus}
      onBlur={onBlur}
      editable={isEdit}
      returnKeyType={returnKeyType}
      underlineColorAndroid="transparent"
      multiline={multiline}
      textContentType={textContentType}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    marginTop: 20,
    paddingHorizontal: 30,
    color: 'black',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth:1,
    borderColor:'white'
  },
});

export default InputField;
