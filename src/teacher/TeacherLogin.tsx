import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDB.db');

interface Props {
  navigation: any;
}

const TeacherLogin: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Teachers WHERE email = ? AND password = ?',
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            navigation.navigate('TeacherMenu');
          } else {
            Alert.alert('Error', 'Invalid email or password');
          }
        },
        (_, error) => {
          console.error(error);
          Alert.alert('Error', 'Database error occurred');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default TeacherLogin;
