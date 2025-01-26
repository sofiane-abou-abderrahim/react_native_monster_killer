import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

export default function App() {
  // Constants for damage values
  const ATTACK_VALUE = 10;
  const STRONG_ATTACK_VALUE = 17;
  const MONSTER_ATTACK_VALUE = 14;
  const HEAL_VALUE = 20;

  // Initial maximum life for monster and player
  const chosenMaxLife = 100;

  // State variables for monster and player health
  const [currentMonsterHealth, setCurrentMonsterHealth] =
    useState(chosenMaxLife);
  const [currentPlayerHealth, setCurrentPlayerHealth] = useState(chosenMaxLife);

  useEffect(() => {
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      Alert.alert("We won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      Alert.alert("You lost!");
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
      Alert.alert("You have a draw!");
    }
  }, [currentMonsterHealth, currentPlayerHealth]);

  // Function to calculate random damage dealt to the monster and the player
  function dealDamage(damage) {
    const dealtDamage = Math.random() * damage;
    return dealtDamage;
  }

  function attackPlayer() {
    const playerDamage = dealDamage(MONSTER_ATTACK_VALUE);
    // const updatedPlayerHealth = Math.max(currentPlayerHealth - playerDamage, 0); // Ensure health does not go below 0
    // setCurrentPlayerHealth(updatedPlayerHealth);

    setCurrentPlayerHealth((prevHealth) => {
      const newPlayerHealth = Math.max(prevHealth - playerDamage, 0);
      return newPlayerHealth;
    });
  }

  // Handler function for the player's attacks
  function attackMonster(mode) {
    let maxDamage;
    if (mode === "ATTACK") {
      maxDamage = ATTACK_VALUE;
    } else if (mode === "STRONG_ATTACK") {
      maxDamage = STRONG_ATTACK_VALUE;
    }
    const monsterDamage = dealDamage(maxDamage);

    const updatedMonsterHealth = Math.max(
      currentMonsterHealth - monsterDamage,
      0
    ); // Ensure health does not go below 0

    setCurrentMonsterHealth(updatedMonsterHealth);

    attackPlayer();
  }

  function attackHandler() {
    attackMonster("ATTACK");
  }

  function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
  }

  function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth === chosenMaxLife) {
      Alert.alert("Your health is already full!");
      return;
    }

    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
      Alert.alert("You can’t heal to more than your max initial health.");
      healValue = chosenMaxLife - currentPlayerHealth;
    } else {
      healValue = HEAL_VALUE;
    }

    const updatedPlayerHealth = currentPlayerHealth + healValue;
    setCurrentPlayerHealth(updatedPlayerHealth);

    // Alert.alert(`You healed ${healValue} health points!`);

    attackPlayer();
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
          <Button title="HEAL" color="#841584" onPress={healPlayerHandler} />
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
