import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../Constants/theme';

const BackButton = ({onPressBack}) => {
  return (
    <TouchableOpacity
      onPress={onPressBack}
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        height: 30,
        width: 30,
        backgroundColor: COLORS.text_white,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
      }}>
      <Ionicons name={'chevron-back'} size={30} color={COLORS.primary} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
