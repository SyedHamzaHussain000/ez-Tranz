import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { RFValue } from 'react-native-responsive-fontsize';

export const COLORS = {
  primary: '#37D2BD',
  secondary: '#fff',
  text_white: '#fff',
  text_placeholder: '#000000',
  primary_with_opacity: 'rgba(9, 33, 67,0.45)',
  secondary_with_opacity: 'rgba(221, 51, 51, 0.8)',
  primary_border: 'rgba(9, 33, 67,0.10)',
  transparent: 'transparent',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 20,
  padding2: 12,

  // font sizes
  h9: 9,
  h10: 10,
  h11: 11,
  h12: 12,
  h13: 13,
  h14: 14,
  h15: 15,
  h16: 16,
  h17: 17,
  h18: 18,
  h19: 19,
  h20: 20,
  h21: 21,
  h22: 22,
  h23: 23,
  h24: 24,
  h25: 25,
  h26: 26,
  h27: 27,
  h28: 28,
  h30: 30,
  h32: 32,

  // app dimensions
  width,
  height,
};



const appTheme = { COLORS, SIZES, };

export default appTheme;
