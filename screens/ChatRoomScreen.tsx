import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import Message from "../components/Message";
import chatRoomData from "../assets/dummy-data/Chats";

const ChatRoomScreen = () => {
  return (
    <View style={styles.page}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
      />
    </View>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
