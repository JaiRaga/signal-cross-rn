import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Message from "../components/Message";
import chatRoomData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";

const ChatRoomScreen = () => {
  const route = useRoute()

  console.warn("displaying chatRoom id: ", route.params?.id)
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
