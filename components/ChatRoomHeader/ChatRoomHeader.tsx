import { useWindowDimensions, View, Image, Platform, Text } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

const ChatRoomHeader = (props) => {
  const { width } = useWindowDimensions();
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
          uri: 'https://avatars.githubusercontent.com/u/44367062?s=400&u=8d55969ede5e1034fe015603d80b82958d249392&v=4',
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
        {props.children}
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
