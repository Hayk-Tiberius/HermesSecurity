import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function About() {
  const { firstName, lastName } = useLocalSearchParams<{
    firstName: string;
    lastName: string;
  }>();

  return (
    <View>
      <Text>Hayk Hovh</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
