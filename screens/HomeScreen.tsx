import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import ChatRoomItem from '../components/ChatRoomItem';
import { RootTabScreenProps } from '../types';
import { ChatRoom, ChatRoomUser } from '../src/models';

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);

      setChatRooms(chatRooms);
    };

    fetchChatRooms();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
        // onEndReached={() => console.log("List Ended...")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
