import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export const COLORS = {
  orange: "rgba(227,102,12,1)",
  amber: "rgba(255,166,43,1)",
  peach: "rgba(255,204,133,1)",
};

export default function MangoBackground({ children }: { children: ReactNode }) {
  return (
    <View style={styles.root}>
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.peach,
    overflow: "hidden",
  },
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
});
