import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Header() {
  return (
    <SafeAreaView>
      <View style={styles.menu}>
        <Link href="/auth/keys">
          <Text>Ключи</Text>
        </Link>
        <Link href="/auth/main">
          <Text>Профиль</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menu: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15 },
});
