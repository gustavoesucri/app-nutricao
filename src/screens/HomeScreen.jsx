import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import Footer from "../components/Footer";
import PropTypes from "prop-types";

// ✅ Importando ícones via ESM
import {
  forkKnifeIcon,
  supIcon,
  metricIcon,
  workoutIcon,
  cartIcon,
  diaryIcon,
} from "../../assets";

const icons = {
  "fork-knife": forkKnifeIcon,
  sup: supIcon,
  metric: metricIcon,
  workout: workoutIcon,
  cart: cartIcon,
  diary: diaryIcon,
};

export default function HomeScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const isScrollable = height <= 653;

  const buttons = [
    { icon: "fork-knife", screen: "Meals", imageSize: 0.78 },
    { icon: "sup", screen: "Store", imageSize: 0.9 },
    { icon: "metric", screen: "Anthropometry", imageSize: 0.87 },
    { icon: "workout", screen: "Workout", imageSize: 0.92 },
    { icon: "cart", screen: "Store", imageSize: 0.825, imageOffsetX: -18, paddingLeft: 10 },
    { icon: "diary", screen: "Diary", imageSize: 1, imageOffsetX: 0, imageOffsetY: 10, }, // Não está aceitando imageOffsetY nesta imagem. Talvez os outros também.
  ];

  const loopedButtons = [...buttons, ...buttons, ...buttons];

  let flatListRef;

  const renderButton = ({ item, index }) => (
    <View key={item.icon + "-" + index} style={[styles.homeButton, { flex: 1 / 2, alignItems: "center" }]}>
      <HomeButton
        iconSource={icons[item.icon]}
        onPress={() => navigation.navigate(item.screen)}
        imageSize={item.imageSize}
        imageOffsetX={item.imageOffsetX}
        paddingLeft={item.paddingLeft}
      />
    </View>
  );

  const handleScroll = ({ nativeEvent }) => {
    const yOffset = nativeEvent.contentOffset.y;
    const contentHeight = nativeEvent.contentSize.height;
    const layoutHeight = nativeEvent.layoutMeasurement.height;

    if (yOffset + layoutHeight >= contentHeight - 20 && flatListRef) {
      flatListRef.scrollToOffset({ offset: contentHeight / 3, animated: false });
    }

    if (yOffset <= 0 && flatListRef) {
      flatListRef.scrollToOffset({ offset: contentHeight / 3, animated: false });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Início" navigation={navigation} />

      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {isScrollable ? (
            <FlatList
              ref={(ref) => (flatListRef = ref)}
              data={loopedButtons}
              keyExtractor={(item, index) => item.icon + "-" + index}
              renderItem={renderButton}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-evenly" }}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
              {buttons.map((b, i) => (
                <View key={b.icon + "-" + i} style={styles.homeButton}>
                  <HomeButton
                    iconSource={icons[b.icon]}
                    onPress={() => navigation.navigate(b.screen)}
                    imageSize={b.imageSize}
                    imageOffsetX={b.imageOffsetX}
                    paddingLeft={b.paddingLeft}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "orange" },
  cardWrapper: { flex: 1, padding: 20, paddingBottom: 80 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    flex: 1,
    maxHeight: 460,
  },
  scroll: { paddingBottom: 40, justifyContent: "center" },
  homeButton: { marginBottom: 16 },
});

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
