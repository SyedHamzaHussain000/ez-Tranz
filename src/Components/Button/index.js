import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../Constants/theme';

const CustomButton = ({
  style,
  onPress,
  buttonText,
  textStyle,
  icon_view,
  isDisabled= false,
}) => {
  return (
    <TouchableOpacity
      
      onPress={onPress}
      style={[styles.container, style]}
      disabled={isDisabled}>
      <View style={[styles.row, icon_view]}>
        <Text style={[styles.defaultText, textStyle]}>{buttonText}</Text>
       
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor:COLORS.primary,
    borderRadius:10,
    marginTop:40,
    alignSelf:'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defaultText: {
    color:'#fff'
   
  },
  icon: {
    width: '12%',
    paddingRight: 30,
  },
});

export default CustomButton;
