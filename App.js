import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Health levels section */}
      <View style={styles.healthSection}>
        <Text style={styles.title}>MONSTER HEALTH</Text>
        {/* Monster health bar */}
        <Progress.Bar progress={0.9} width={200} color="#ff0000" />
        <Text style={styles.title}>PLAYER HEALTH</Text>
        {/* Bonus life indicator */}
        <View style={styles.bonusLifeContainer}>
          <Text style={styles.bonusLife}>1</Text>
        </View>
        {/* Player health bar */}
        <Progress.Bar progress={0.5} width={200} color="#00ff00" />
      </View>

      {/* Controls section */}
      <View style={styles.controls}>
        {/* Attack button */}
        <View style={styles.buttonContainer}>
          <Button title="ATTACK" color="#841584" />
        </View>
        {/* Strong attack button */}
        <View style={styles.buttonContainer}>
          <Button title="STRONG ATTACK" color="#841584" />
        </View>
        {/* Heal button */}
        <View style={styles.buttonContainer}>
          <Button title="HEAL" color="#841584" />
        </View>
        {/* Show log button */}
        <View style={styles.buttonContainer}>
          <Button title="SHOW LOG" color="#841584" />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container for the app
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  // Section for health bars
  healthSection: {
    width: "100%",
    marginBottom: 32,
    alignItems: "center",
  },
  // Title styles for health sections
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  // Styles for progress bars
  progressBar: {
    width: "80%",
    height: 10,
    marginVertical: 10,
  },
  // Container for bonus life indicator
  bonusLifeContainer: {
    position: "absolute",
    right: 50,
    top: 60,
    backgroundColor: "#ffcc00",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  // Text style for bonus life indicator
  bonusLife: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  // Container for control buttons
  controls: {
    width: "100%",
    alignItems: "center",
  },
  // Style for individual buttons
  buttonContainer: {
    marginVertical: 8,
    width: "80%",
  },
});
