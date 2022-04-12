import React from 'react'
import { View, Image, Text } from "react-native";
import styles from './styles';

const ChatRoomItem = () => {
  return (
    <View style={styles.container}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/44367062?s=400&u=8d55969ede5e1034fe015603d80b82958d249392&v=4",
          }}
          style={styles.image}
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>4</Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>Raga</Text>
            <Text style={styles.text}>1:00 AM</Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            modi ut atque vero assumenda neque expedita explicabo, harum fugiat
            nam repellat corporis, commodi sequi unde voluptates voluptatem
            maiores doloribus tenetur quo aliquid nostrum. Alias nostrum
            voluptas asperiores dolor eius quam voluptatem doloribus,
            consectetur dignissimos! Corrupti aliquam cupiditate veniam?
            Reprehenderit, rerum?
          </Text>
        </View>
      </View>
  )
}

export default ChatRoomItem