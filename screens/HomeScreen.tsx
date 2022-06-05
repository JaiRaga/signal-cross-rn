import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import { RootTabScreenProps } from '../types';

import chatRooms from '../assets/dummy-data/ChatRooms';

const chatRoom1 = chatRooms[3];
const chatRoom2 = chatRooms[1];

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<'Home'>) {
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
