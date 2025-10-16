import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import PropTypes from "prop-types";

export default function SupplementsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header title="Suplementos" navigation={navigation} />
      <Text style={styles.text}>💊 Supplements Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22 },
});

SupplementsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};