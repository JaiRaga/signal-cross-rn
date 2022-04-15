import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import styles from "./styles";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  console.warn(message)
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <SimpleLineIcons
          name="emotsmile"
          size={24}
          color="grey"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMessage(text)}
          placeholder="Signal Message..."
        />
        <Feather name="camera" size={24} color="grey" style={styles.icon} />
        <MaterialCommunityIcons
          name="microphone-outline"
          size={24}
          color="grey"
          style={styles.icon}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AntDesign name="plus" size={24} color="white" />
      </View>
    </View>
  );
}
