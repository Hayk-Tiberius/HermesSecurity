import { Pressable, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return <Pressable style={styles.container}>Привет, Рим!</Pressable>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
