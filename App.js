import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

export default function App() {
  // Constants for damage values
  const ATTACK_VALUE = 10;
  const STRONG_ATTACK_VALUE = 17;
  const MONSTER_ATTACK_VALUE = 14;

  // Initial maximum life for monster and player
  const chosenMaxLife = 100;

  // State variables for monster and player health
  const [currentMonsterHealth, setCurrentMonsterHealth] =
    useState(chosenMaxLife);
  const [currentPlayerHealth, setCurrentPlayerHealth] = useState(chosenMaxLife);

  // Function to calculate random damage dealt to the monster and the player
  function dealDamage(damage) {
    const dealtDamage = Math.random() * damage;
    return dealtDamage;
  }

  // Handler function for the player's attack and monster's counter-attack
  function attackAndCounterAttack(mode) {
    let maxDamage;
    if (mode === "ATTACK") {
      maxDamage = ATTACK_VALUE;
    } else if (mode === "STRONG_ATTACK") {
      maxDamage = STRONG_ATTACK_VALUE;
    }
    const monsterDamage = dealDamage(maxDamage);
    const playerDamage = dealDamage(MONSTER_ATTACK_VALUE);

    const updatedMonsterHealth = Math.max(
      currentMonsterHealth - monsterDamage,
      0
    ); // Ensure health does not go below 0
    const updatedPlayerHealth = Math.max(currentPlayerHealth - playerDamage, 0); // Ensure health does not go below 0

    setCurrentMonsterHealth(updatedMonsterHealth);
    setCurrentPlayerHealth(updatedPlayerHealth);

    if (updatedMonsterHealth <= 0 && updatedPlayerHealth > 0) {
      Alert.alert("We won!");
    } else if (updatedPlayerHealth <= 0 && updatedMonsterHealth > 0) {
      Alert.alert("You lost!");
    } else if (updatedMonsterHealth <= 0 && updatedPlayerHealth <= 0) {
      Alert.alert("You have a draw!");
    }
  }

  function attackHandler() {
    attackAndCounterAttack("ATTACK");
  }

  function strongAttackHandler() {
    attackAndCounterAttack("STRONG_ATTACK");
  }

  return (
    <View style={styles.container}>
      {/* Health levels section */}
      <View style={styles.healthSection}>
        <Text style={styles.title}>MONSTER HEALTH</Text>
        {/* Monster health bar */}
        <Progress.Bar
          progress={currentMonsterHealth / chosenMaxLife}
          width={200}
          color="#ff0000"
        />
        <Text style={styles.title}>PLAYER HEALTH</Text>
        {/* Bonus life indicator */}
        <View style={styles.bonusLifeContainer}>
          <Text style={styles.bonusLife}>1</Text>
        </View>
        {/* Player health bar */}
        <Progress.Bar
          progress={currentPlayerHealth / chosenMaxLife}
          width={200}
          color="#00ff00"
        />
      </View>

      {/* Controls section */}
      <View style={styles.controls}>
        {/* Attack button */}
        <View style={styles.buttonContainer}>
          <Button title="ATTACK" color="#841584" onPress={attackHandler} />
        </View>
        {/* Strong attack button */}
        <View style={styles.buttonContainer}>
          <Button
            title="STRONG ATTACK"
            color="#841584"
            onPress={strongAttackHandler}
          />
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
