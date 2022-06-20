import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import EmojiSelector from 'react-native-emoji-selector';
import { Auth, DataStore } from 'aws-amplify';
import { Message, ChatRoom } from '../../src/models';

import styles from './styles';

export default function MessageInput({ chatRoom }) {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  // Image picker
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
    setIsEmojiPickerOpen(false);
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
      {image && (
        <View style={styles.sendImageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Pressable onPress={() => setImage(null)}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={styles.closeIcon}
            />
          </Pressable>
        </View>
      )}
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
          <Pressable onPress={pickImage}>
            <Feather name="image" size={24} color="grey" style={styles.icon} />
          </Pressable>
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
          onEmojiSelected={(emoji) =>
            setMessage((currentMesage) => currentMesage + emoji)
          }
          columns={10}
          showSearchBar={false}
        />
      )}
    </KeyboardAvoidingView>
  );
}
