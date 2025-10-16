import { View, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ResizeMode, Video } from "expo-av";
import { useRef } from "react";
import PropTypes from "prop-types";

export default function WorkoutScreen({ navigation }) {
  const video = useRef(null);

  return (
    <View style={styles.container}>
        <Header title="Exercícios" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: "https://www.w3schools.com/html/mov_bbb.mp4", // pode ser link ou arquivo local
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          </View>
        </ScrollView>

    <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  video: { width: "100%", height: 250, borderRadius: 10, backgroundColor: "#fff", alignItems: "center" },
  container: { flex: 1, backgroundColor: "orange" },
  scroll: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
});

WorkoutScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
