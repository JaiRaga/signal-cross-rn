import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'

const myId = "u1"

const Message = ({message}) => {
  const isMe = message.user.id === myId
  
  return (
    <View style={[styles.container, isMe ? styles.rightContainer : styles.leftContainer]}>
      <Text style={{color: isMe ? "white" : "black"}}>{message.content}</Text>
    </View>
  )
}

export default Message