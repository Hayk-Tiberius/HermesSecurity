import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Itim_400Regular } from "@expo-google-fonts/itim";
import { Kurale_400Regular } from "@expo-google-fonts/kurale";

const COLORS = {
  orange: "rgba(227,102,12,1)",
  amber: "rgba(255,166,43,1)",
  peach: "rgba(255,204,133,1)",
  buttonFill: "#FF8E3A",
  buttonBorder: "#C2530A",
  inputFill: "rgba(255,255,255,0.45)",
  text: "#000",
  error: "#B3260E",
};

const FONT_TITLE = "Itim_400Regular";
const FONT_TEXT = "Kurale_400Regular";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({ Itim_400Regular, Kurale_400Regular });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4242/api/auth/main", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Ошибка авторизации:", data);
        setError("Неверный логин или пароль");
        return;
      }

      router.replace({
        pathname: "/auth/main",
        params: {
          firstName: data.firstName,
          lastName: data.lastName,
          userRole: data.userRole,
          jobTitle: data.jobTitle,
        },
      });
    } catch (e) {
      console.error("Ошибка запроса", e);
      setError("Не удалось подключиться к серверу");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.root, styles.center]}>
        <ActivityIndicator color={COLORS.orange} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Логотип */}
            <View style={styles.logoBlock}>
              <Text style={styles.logo}>Mango Mode</Text>
              <View style={styles.logoLine} />
              <Text style={styles.tagline}>
                Будь таким же сладким{"\n"}и освежающим, как манго!
              </Text>
            </View>

            {/* Форма */}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Пользователь"
                placeholderTextColor="rgba(0,0,0,0.45)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />

              <TextInput
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor="rgba(0,0,0,0.45)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <Pressable
                onPress={handleSubmit}
                disabled={loading}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                  loading && styles.buttonDisabled,
                ]}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.text} />
                ) : (
                  <Text style={styles.buttonText}>Войти</Text>
                )}
              </Pressable>
            </View>

            <Pressable
              onPress={() => router.push("/auth/about")}
              style={({ pressed }) => [styles.aboutTab, pressed && styles.aboutTabPressed]}
            >
              <Text style={styles.aboutText}>О нас</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: {
    flex: 1,
    backgroundColor: COLORS.peach,
    overflow: "hidden",
  },
  center: { justifyContent: "center", alignItems: "center" },

  // Пятна: большие круги, выходящие за края экрана
  blobTop: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: 260,
    backgroundColor: COLORS.amber,
    top: -330,
    right: -230,
  },
  blobBottom: {
    position: "absolute",
    width: 480,
    height: 480,
    borderRadius: 240,
    backgroundColor: COLORS.orange,
    bottom: -330,
    left: -240,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: "space-between",
  },

  logoBlock: { alignSelf: "stretch" },
  logo: {
    fontFamily: FONT_TITLE,
    fontSize: 44,
    color: COLORS.text,
  },
  logoLine: {
    height: 3,
    backgroundColor: COLORS.text,
    marginTop: 4,
    marginBottom: 12,
    width: "85%",
    borderRadius: 2,
  },
  tagline: {
    fontFamily: FONT_TEXT,
    fontSize: 20,
    lineHeight: 30,
    color: COLORS.text,
  },

  form: {
    gap: 14,
    marginVertical: 32,
  },
  input: {
    fontFamily: FONT_TEXT,
    fontSize: 18,
    color: COLORS.text,
    backgroundColor: COLORS.inputFill,
    borderWidth: 2,
    borderColor: COLORS.amber,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  error: {
    fontFamily: FONT_TEXT,
    fontSize: 15,
    color: COLORS.error,
  },

  // Кнопка как в макете: заливка, тёмная рамка, жёсткая тень
  button: {
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 64,
    backgroundColor: COLORS.buttonFill,
    borderWidth: 3,
    borderColor: COLORS.buttonBorder,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
  buttonPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    shadowOffset: { width: 2, height: 3 },
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: {
    fontFamily: FONT_TEXT,
    fontSize: 28,
    color: COLORS.text,
  },

  // Вкладка «О нас» внизу, по стилю как «Авторизоваться» в макете
  aboutTab: {
    alignSelf: "center",
    paddingHorizontal: 28,
    paddingVertical: 10,
    backgroundColor: COLORS.amber,
    borderWidth: 2,
    borderColor: "#F28F00",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  aboutTabPressed: { opacity: 0.8 },
  aboutText: {
    fontFamily: FONT_TEXT,
    fontSize: 18,
    color: COLORS.text,
  },
});
