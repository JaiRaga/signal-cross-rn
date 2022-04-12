import { View, Image, Text, StyleSheet } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.page}>
      <ChatRoomItem />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1
  },
});
