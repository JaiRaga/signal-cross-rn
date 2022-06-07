import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector';
import { Auth, DataStore } from 'aws-amplify';
import { Message, ChatRoom } from '../../src/models';

import styles from './styles';

export default function MessageInput({ chatRoom }) {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const sendMessage = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: chatRoom.id,
      })
    );

    updateLastMessage(newMessage);

    setMessage('');
    setIsEmojiPickerOpen(false)
  };

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      ChatRoom.copyOf(chatRoom, (updatedChatRoom) => {
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPlusClicked = () => {
    console.warn('Plus Clicked');
  };

  const onPress = () => {
    if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: isEmojiPickerOpen ? '50%' : 'auto' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() =>
              setIsEmojiPickerOpen((currentValue) => !currentValue)
            }
          >
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="grey"
              style={styles.icon}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Signal Message..."
            onPressIn={() => setIsEmojiPickerOpen(false)}
          />
          <Feather name="camera" size={24} color="grey" style={styles.icon} />
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </View>
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          {message ? (
            <Feather name="send" size={18} color="white" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Pressable>
      </View>

      {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) => setMessage((currentMesage) => currentMesage + emoji)}
          columns={10}
          showSearchBar={false}
        />
      )}
    </KeyboardAvoidingView>
  );
}
