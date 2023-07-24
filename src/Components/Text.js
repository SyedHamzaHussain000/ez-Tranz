import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { COLORS, FONTS } from '../Constants/theme';

const CustomText = ({style, text, numberOfLines, onLayout}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.text, style]}
      onLayout={onLayout}>
      {text}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    // ...FONTS.Medium16,
    color: COLORS.text_white,
  },
});

export default CustomText;
