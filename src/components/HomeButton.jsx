import { TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const HomeButton = ({
  iconSource,
  onPress,
  imageSize = 0.8,
  imageOffsetX = 0,
  imageOffsetY = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  paddingBottom = 0,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { paddingLeft, paddingRight, paddingTop, paddingBottom },
      ]}
      onPress={onPress}
    >
      <Image
        source={iconSource}
        style={{
          width: `${imageSize * 100}%`,
          height: `${imageSize * 100}%`,
          marginLeft: imageOffsetX,
          marginTop: imageOffsetY,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

HomeButton.propTypes = {
  iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  onPress: PropTypes.func.isRequired,
  imageSize: PropTypes.number,
  imageOffsetX: PropTypes.number,
  imageOffsetY: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
};

const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 130,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default HomeButton;
