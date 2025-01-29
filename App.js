import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Progress from "react-native-progress";

export default function App() {
  // Constants for attack and health values
  const ATTACK_VALUE = 10;
  const STRONG_ATTACK_VALUE = 17;
  const MONSTER_ATTACK_VALUE = 14;
  const HEAL_VALUE = 20;

  // Initial health points for player and monster
  const [enteredValue, setEnteredValue] = useState(""); // State to track if the user has confirmed the health value
  const [chosenMaxLife, setChosenMaxLife] = useState(100); // State to store the chosen maximum health (default is 100)
  const [isHealthConfirmed, setIsHealthConfirmed] = useState(false); // State to track if the user has confirmed the health value

  // State to track health points
  const [currentMonsterHealth, setCurrentMonsterHealth] =
    useState(chosenMaxLife);
  const [currentPlayerHealth, setCurrentPlayerHealth] = useState(chosenMaxLife);

  // State to track the player's previous health (for bonus life)
  const [previousPlayerHealth, setPreviousPlayerHealth] =
    useState(chosenMaxLife);

  // State to check if the player has a bonus life
  const [hasBonusLife, setHasBonusLife] = useState(true);

  // State to determine if the game is over
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isHealthConfirmed) {
      setCurrentMonsterHealth(chosenMaxLife);
      setCurrentPlayerHealth(chosenMaxLife);
      setPreviousPlayerHealth(chosenMaxLife);
    }
  }, [chosenMaxLife, isHealthConfirmed]);

  // Effect to monitor health changes and handle game logic
  useEffect(() => {
    // Handle bonus life when player's health drops to 0
    if (currentPlayerHealth <= 0 && hasBonusLife) {
      setHasBonusLife(false);
      setCurrentPlayerHealth(previousPlayerHealth); // Restore health to its state before the monster's attack
      Alert.alert("You would be dead but the bonus life saved you!");
      return;
    }

    // Handle game end scenarios
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
      setIsGameOver(true); // Mark the game as over

      let resultMessage = "It's a draw!";
      if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        resultMessage = "We won!";
      } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        resultMessage = "You lost!";
      }

      // Show alert and wait for user to reset the game
      Alert.alert(resultMessage, "Start a new game?", [
        { text: "OK", onPress: reset }, // Reset the game on button press
      ]);
    }
  }, [currentMonsterHealth, currentPlayerHealth, hasBonusLife]);

  // Function to handle health confirmation
  function confirmHealthHandler() {
    const parsedValue = parseInt(enteredValue);

    if (isNaN(parsedValue) || parsedValue <= 0) {
      setChosenMaxLife(100);
      console.log("Input is invalid, used default value!");
    } else {
      setChosenMaxLife(parsedValue);
      console.log("Valid input!");
    }

    setIsHealthConfirmed(true); // Mark the health as confirmed
    console.log("Health confirmed", enteredValue);
  }

  function reset() {
    setCurrentPlayerHealth(chosenMaxLife);
    setCurrentMonsterHealth(chosenMaxLife);
    setIsGameOver(false); // Re-enable gameplay
  }

  // Function to calculate random damage dealt to the monster and the player
  function dealDamage(damage) {
    const dealtDamage = Math.random() * damage;
    return dealtDamage;
  }

  // Function to begin a new round and save the player's health
  function startNewRound() {
    setPreviousPlayerHealth(currentPlayerHealth); // Save the current health at the start of the round
    attackPlayer(); // Monster attacks at the beginning of the round
  }

  // Handler function for the monster's attacks
  function attackPlayer() {
    const playerDamage = dealDamage(MONSTER_ATTACK_VALUE);

    setCurrentPlayerHealth((prevHealth) => {
      const newPlayerHealth = Math.max(prevHealth - playerDamage, 0);
      return newPlayerHealth;
    });
  }

  // Handler function for the player's attacks
  function attackMonster(mode) {
    if (isGameOver) return; // Prevent actions if the game is over

    let maxDamage;
    if (mode === "ATTACK") {
      maxDamage = ATTACK_VALUE;
    } else if (mode === "STRONG_ATTACK") {
      maxDamage = STRONG_ATTACK_VALUE;
    }
    const monsterDamage = dealDamage(maxDamage);

    setCurrentMonsterHealth((prevHealth) =>
      Math.max(prevHealth - monsterDamage, 0)
    ); // Ensure health does not go below 0

    startNewRound(); // Start the next round after the player's attack
  }

  function attackHandler() {
    attackMonster("ATTACK");
  }

  function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
  }

  function healPlayerHandler() {
    if (isGameOver) return; // Prevent actions if the game is over

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

    startNewRound(); // Start a new round after healing
  }

  return (
    <View style={styles.container}>
      {/* Health levels section */}
      {isHealthConfirmed ? (
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
          {hasBonusLife && (
            <View style={styles.bonusLifeContainer}>
              <Text style={styles.bonusLife}>1</Text>
            </View>
          )}
          {/* Player health bar */}
          <Progress.Bar
            progress={currentPlayerHealth / chosenMaxLife}
            width={200}
            color="#00ff00"
          />
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
              <Button
                title="HEAL"
                color="#841584"
                onPress={healPlayerHandler}
              />
            </View>
            {/* Show log button */}
            <View style={styles.buttonContainer}>
              <Button title="SHOW LOG" color="#841584" />
            </View>
          </View>
        </View>
      ) : (
        <View>
          {/* Maximum life choice section */}
          <Text style={styles.text}>
            Enter maximum life for you and the monster:
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad" // Display numeric keyboard
            placeholder="100"
            onChangeText={(text) => setEnteredValue(text)} // Update the input state
            value={enteredValue}
          />
          <Button title="Confirm" onPress={confirmHealthHandler} />
        </View>
      )}

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
