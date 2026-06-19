import { ActivityIndicator, Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";

import MangoBackground, { COLORS } from "../auth/Mangobackground";

const FONT_TITLE = "Itim_400Regular";
const FONT_TEXT = "Kurale_400Regular";

const DEVELOPER_GITHUB = "";
const DESIGNER_GITHUB = "";

type PersonProps = {
  role: string;
  name: string;
  github: string;
};

function Person({ role, name, github }: PersonProps) {
  return (
    <View style={styles.person}>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.name}>{name}</Text>
      <Pressable disabled={!github} onPress={() => Linking.openURL(github)}>
        <Text style={styles.github}>GitHub: {github || "…"}</Text>
      </Pressable>
    </View>
  );
}

export default function AboutScreen() {
  const [fontsLoaded] = useFonts({ Itim_400Regular, Kurale_400Regular });

  if (!fontsLoaded) {
    return (
      <MangoBackground>
        <View style={styles.center}>
          <ActivityIndicator color={COLORS.orange} />
        </View>
      </MangoBackground>
    );
  }

  return (
    <MangoBackground>
      <SafeAreaView style={styles.flex}>
        <View style={styles.content}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Вернуться назад"
            hitSlop={8}
            style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
          >
            {/* <Image source={require("../assets/images/Ellipse_1.png")} style={styles.backCircle} /> */}
            {/* Временная стрелка. Когда пришлёте иконку, замените этот Text на <Image /> */}
            <Text style={styles.backArrow}>←</Text>
          </Pressable>

          <Text style={styles.title}>О нас</Text>
          <View style={styles.titleLine} />

          <View style={styles.people}>
            <Person role="Разработчик" name="Оганнисян Гайк" github={DEVELOPER_GITHUB} />
            <Person role="Дизайнер" name="Музыка Анна" github={DESIGNER_GITHUB} />
          </View>
        </View>
      </SafeAreaView>
    </MangoBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
  },

  back: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  backPressed: { opacity: 0.75 },
  backCircle: {
    position: "absolute",
    width: 48,
    height: 48,
  },
  backArrow: {
    fontFamily: FONT_TEXT,
    fontSize: 26,
    lineHeight: 30,
    color: "#000",
  },

  title: {
    fontFamily: FONT_TITLE,
    fontSize: 44,
    color: "#000",
  },
  titleLine: {
    height: 3,
    width: "50%",
    backgroundColor: "#000",
    borderRadius: 2,
    marginTop: 4,
    marginBottom: 32,
  },

  people: { gap: 36 },
  person: { gap: 6 },
  role: {
    fontFamily: FONT_TEXT,
    fontSize: 16,
    color: "rgba(0,0,0,0.6)",
  },
  name: {
    fontFamily: FONT_TEXT,
    fontSize: 26,
    color: "#000",
  },
  github: {
    fontFamily: FONT_TEXT,
    fontSize: 18,
    color: "#000",
  },
});
