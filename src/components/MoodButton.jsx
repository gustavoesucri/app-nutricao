import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function MoodButton({ label, active, onPress, color }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        active && { backgroundColor: color || "#4ADE80", borderColor: "#000" },
      ]}
    >
      <Text style={[styles.text, active && { color: "#000" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: "bold",
    color: "#333",
  },
});

MoodButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
};