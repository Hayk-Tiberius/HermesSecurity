import { Pressable, StyleSheet, Text } from "react-native";

import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <Pressable onPress={() => router.push("/auth/login")}>Для сотрудников</Pressable>
      <Pressable onPress={() => router.push("/auth/login")}>Для охраны</Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
