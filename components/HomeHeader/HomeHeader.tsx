import { useWindowDimensions, View, Image, Platform, Text } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';

const HomeHeader = (props) => {
  const { width } = useWindowDimensions();

  const logout = () => {
    Auth.signOut()
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width,
          padding: 10,
          backgroundColor: 'yellow',
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
          textAlign: 'center',
          marginLeft: 82,
          fontWeight: 'bold',
        }}
      >
        Signal
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
      <MaterialCommunityIcons
        name="logout"
        size={24}
        color="black"
        onPress={logout}
        style={{ marginHorizontal: 10 }}
      />
    </View>
  );
};

export default HomeHeader;
