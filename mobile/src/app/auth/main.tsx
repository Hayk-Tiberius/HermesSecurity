import { Image, StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import MangoBackground, { COLORS } from "./Mangobackground";
import { useLocalSearchParams } from "expo-router";

const FONT_TITLE = "Itim_400Regular";
const FONT_TEXT = "Kurale_400Regular";

export default function Login() {
  const { firstName, lastName, jobTitle, userRole, photoUri } = useLocalSearchParams<{
    firstName: string;
    lastName: string;
    jobTitle: string;
    userRole: string;
    photoUri?: string; // в будущем: ссылка на фото пользователя
  }>();

  // Пока фото нет, в кружке показываются инициалы
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <MangoBackground>
      <View style={styles.container}>
        <Header />

        <View style={styles.content}>
          <View style={styles.avatar}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.initials}>{initials}</Text>
            )}
          </View>

          <Text style={styles.welcome}>Добро пожаловать!</Text>

          <Text style={styles.fullName}>
            {firstName} {lastName}
          </Text>

          {userRole ? <Text style={styles.role}>{userRole}</Text> : null}

          {jobTitle ? <Text style={styles.jobTitle}>{jobTitle}</Text> : null}
        </View>
      </View>
    </MangoBackground>
  );
}

const AVATAR_SIZE = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingBottom: 48,
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#FF8E3A",
    borderWidth: 5,
    borderColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 24,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  initials: {
    fontFamily: FONT_TITLE,
    fontSize: 56,
    color: "#000",
  },

  welcome: {
    fontFamily: FONT_TEXT,
    fontSize: 18,
    color: "rgba(0,0,0,0.6)",
    marginBottom: 8,
  },
  fullName: {
    fontFamily: FONT_TITLE,
    fontSize: 34,
    color: "#000",
    textAlign: "center",
  },
  role: {
    fontFamily: FONT_TEXT,
    fontSize: 22,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  jobTitle: {
    fontFamily: FONT_TEXT,
    fontSize: 17,
    color: "rgba(0,0,0,0.65)",
    textAlign: "center",
    marginTop: 6,
  },
});
