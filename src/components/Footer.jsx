import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function Footer({ navigation }) {
  const icons = [
    require("../../assets/home.png"),
    require("../../assets/metric.png"),
    require("../../assets/burguer.png"),
    require("../../assets/cart.png"),
    require("../../assets/gift.png"),
  ];

  const onPressHandlers = [
    () => navigation.navigate("Home"),
    () => navigation.navigate("Anthropometry"),
    () => navigation.navigate("Menu"),
    () => navigation.navigate("Store"),
    () => navigation.navigate("Diary"),
  ];

  const imageSizes = [1.2, 1.38, 1.38, 1.3, 1.98];
  const imageOffsetsX = [0, 0, 0, 1, 0];
  const imageOffsetsY = [0, 3, 0, 0, 0];

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={onPressHandlers[index]}
          style={styles.button}
        >
          <Image
            source={icon}
            style={{
              width: 40 * imageSizes[index],
              height: 40 * imageSizes[index],
              transform: [
                { translateX: imageOffsetsX[index] },
                { translateY: imageOffsetsY[index] },
              ],
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
