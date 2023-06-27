import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useErrorBoundary } from "app";

export const RnAppFallback = () => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OOpsie</Text>
      <TouchableOpacity onPress={resetBoundary}>
        <Text>Reset Boundary</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: "#F00",
    fontSize: 50,
  },
});
