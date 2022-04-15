import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import styles from "./styles";

export default function MessageInput() {
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <SimpleLineIcons
          name="emotsmile"
          size={24}
          color="grey"
          style={styles.icon}
        />
        <TextInput style={styles.input} />
        <Feather name="camera" size={24} color="black" />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>+</Text>
      </View>
    </View>
  );
}
