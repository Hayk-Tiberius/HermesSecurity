import { Pressable, StyleSheet, Text } from "react-native";

export default function Login() {
  return <Pressable style={styles.container}>Привет, Пекин!</Pressable>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
