import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import PropTypes from "prop-types";

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Menu" navigation={navigation} />
      <Text style={styles.text}>🍔 Menu Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22 },
});

MenuScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};