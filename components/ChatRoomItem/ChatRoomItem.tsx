import React, { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore, Auth } from 'aws-amplify';
import { User, ChatRoomUser } from '../../src/models';
import styles from './styles';

const ChatRoomItem = ({ chatRoom }) => {
  const [users, setUsers] = useState<User[]>([]); // all users in the chat room
  const [user, setUser] = useState<User | null>(null); // to display user
  // const user = chatRoom.users[1];

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((ChatRoomUser) => ChatRoomUser.chatRoom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);

      console.log(fetchedUsers);
      setUsers(fetchedUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };

    fetchUser();
  }, []);

  const onPress = () => {
    navigation.navigate('ChatRoom', { id: chatRoom.id });
  };

  if (!user) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />
      {!!chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{chatRoom.lastMessage?.createdAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {chatRoom.lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatRoomItem;
