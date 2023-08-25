import React from "react";
import { Circle } from "react-native-animated-spinkit";
import { COLORS } from "../../Constants/theme";
// import { COLORS } from "../../utils/COLORS";

const WaveLoader = ({ style, color, size }) => {
  return (
    <Circle
      color={color ? color : COLORS.primary}
      size={size ? size : 50}
      style={[{ marginTop:10, alignSelf: "center" }, style]}
    />
  );
};

export default WaveLoader;
