import { TouchableOpacity, Image, StyleSheet } from "react-native";

const HomeButton = ({ iconSource, onPress, imageSize = 0.8, imageOffsetX = 0, imageOffsetY = 0, paddingLeft, paddingRight, paddingTop, paddingBottom }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { paddingLeft, paddingRight, paddingTop, paddingBottom }]}
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
