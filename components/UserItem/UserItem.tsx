import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth, DataStore } from 'aws-amplify';
import { User, ChatRoom, ChatRoomUser } from '../../src/models';

import styles from './styles';

const UserItem = ({ user }) => {
  const navigation = useNavigation();

  const onPress = async () => {
    // Check for existing chat room between two users
    

    // create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    // Connect authenticated user with the chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    await DataStore.save(
      new ChatRoomUser({
        user: dbUser!,
        chatRoom: newChatRoom,
      })
    );

    // Connect clicked user with the chat room
    await DataStore.save(
      new ChatRoomUser({
        user,
        chatRoom: newChatRoom,
      })
    );

    // Navigate to the new chat room
    navigation.navigate('ChatRoom', { id: newChatRoom.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UserItem;
