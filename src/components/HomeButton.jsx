import { TouchableOpacity, Image, StyleSheet } from "react-native";

const HomeButton = ({ iconSource, onPress, imageSize = 0.7 }) => {
  // imageSize é a % do espaço do botão que a imagem vai ocupar (0.0 a 1.0). Cada uma pode assim ser individualizada, pois são transparências diferentes.
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        source={iconSource}
        style={{
          width: `${imageSize * 100}%`,
          height: `${imageSize * 100}%`,
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
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default HomeButton;
