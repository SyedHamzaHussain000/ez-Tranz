import { View, ActivityIndicator, Modal } from "react-native";
import React from "react";
import { styles } from "./index.style";
// import { COLORS } from "../../utils/COLORS";
import { Fold } from "react-native-animated-spinkit";
import { COLORS } from "../../Constants/theme";

const LoaderModal = ({ visible,style, color, size }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.main_view}>
      <Fold    
      color={color ? color : COLORS.primary}
      size={size ? size : 50}
      style={[{ marginTop:10, alignSelf: "center" }, style]}
    />
      </View>
    </Modal>
  );
};

export default LoaderModal;
