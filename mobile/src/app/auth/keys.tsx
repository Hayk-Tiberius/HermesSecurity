import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import MangoBackground, { COLORS } from "./Mangobackground";

const FONT_TITLE = "Itim_400Regular";
const FONT_TEXT = "Kurale_400Regular";

const FLOORS = [1, 2, 3, 4, 5];
const ROOMS_PER_FLOOR = 9;

const getRooms = (floor: number) =>
  Array.from({ length: ROOMS_PER_FLOOR }, (_, i) => floor * 100 + i + 1);

export default function Keys() {
  const [floor, setFloor] = useState<number | null>(null);

  const handleRoomPress = (room: number) => {
    // Здесь позже будет логика выдачи/бронирования ключа
    console.log("Выбран кабинет", room);
  };

  return (
    <MangoBackground>
      <SafeAreaView style={styles.flex}>
        <Header />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {floor === null ? (
            <>
              <Text style={styles.title}>Выберите этаж</Text>
              <View style={styles.grid}>
                {FLOORS.map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => setFloor(f)}
                    style={({ pressed }) => [styles.floorCard, pressed && styles.pressed]}
                  >
                    <Text style={styles.floorNumber}>{f}</Text>
                    <Text style={styles.floorLabel}>этаж</Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <>
              <Pressable
                onPress={() => setFloor(null)}
                style={({ pressed }) => [styles.backPill, pressed && styles.pressed]}
              >
                <Text style={styles.backPillText}>← Все этажи</Text>
              </Pressable>

              <Text style={styles.title}>{floor} этаж</Text>

              <View style={styles.grid}>
                {getRooms(floor).map((room) => (
                  <Pressable
                    key={room}
                    onPress={() => handleRoomPress(room)}
                    style={({ pressed }) => [styles.roomCard, pressed && styles.pressed]}
                  >
                    <Text style={styles.roomNumber}>{room}</Text>
                    <Text style={styles.plus}>+</Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </MangoBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },

  title: {
    fontFamily: FONT_TITLE,
    fontSize: 34,
    color: "#000",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },

  floorCard: {
    width: "48%",
    height: 110,
    borderRadius: 24,
    backgroundColor: "#FF8E3A",
    borderWidth: 3,
    borderColor: "#C2530A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  floorNumber: {
    fontFamily: FONT_TITLE,
    fontSize: 44,
    lineHeight: 50,
    color: "#000",
  },
  floorLabel: {
    fontFamily: FONT_TEXT,
    fontSize: 16,
    color: "#000",
  },

  roomCard: {
    width: "48%",
    height: 110,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 2,
    borderColor: COLORS.amber,
    alignItems: "center",
    justifyContent: "center",
  },
  roomNumber: {
    position: "absolute",
    top: 10,
    left: 16,
    fontFamily: FONT_TEXT,
    fontSize: 16,
    color: "#000",
  },
  plus: {
    fontFamily: FONT_TEXT,
    fontSize: 54,
    lineHeight: 60,
    color: "rgba(0,0,0,0.3)",
  },

  backPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: COLORS.amber,
    borderWidth: 2,
    borderColor: "#F28F00",
    borderRadius: 12,
  },
  backPillText: {
    fontFamily: FONT_TEXT,
    fontSize: 16,
    color: "#000",
  },
});
