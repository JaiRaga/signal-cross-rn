import { useState, useEffect } from 'react';
import { useWindowDimensions, View, Image, Platform, Text } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoomUser, User } from '../../src/models';

interface chatRoomHeaderProps {
  id: string;
}

const ChatRoomHeader = ({ id }: chatRoomHeaderProps) => {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchUser = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((ChatRoomUser) => ChatRoomUser.chatRoom.id === id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(fetchedUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
    };

    fetchUser();
  }, []);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width - 25,
          // marginLeft: 25,
          padding: 10,
          // backgroundColor: 'yellow',
        },
        Platform.OS === 'android' ? { marginRight: 60 } : null,
      ]}
    >
      <Image
        source={{
          uri: user?.imageUri,
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        {user?.name}
      </Text>
      <Feather
        name="camera"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
      <Feather
        name="edit-2"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
      <Entypo
        name="dots-three-vertical"
        size={24}
        color="black"
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
};

export default ChatRoomHeader;
