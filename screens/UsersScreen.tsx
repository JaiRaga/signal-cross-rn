import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { DataStore } from 'aws-amplify';

import { User } from '../src/models';
import UserItem from '../components/UserItem';

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Get users
    DataStore.query(User).then(setUsers)
    
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
        // onEndReached={() => console.log("List Ended...")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
