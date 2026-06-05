import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

import { router } from "expo-router";


export default function HomeScreen() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {


    try {
      const response = await fetch("http://localhost:4242/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", data);

      if (!response.ok) {
        console.error("Ошибка авторизации:", data);
        return;
      }
      router.replace("/auth/login");
    }


    catch (error) {
      console.error("Ошибка запроса", error)
    }
  }
  return (
    <>
      <TextInput

        placeholder="Пользователь"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput

        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        onPress={handleSubmit}
      >
        <Text>Войти</Text>
      </Pressable>
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
