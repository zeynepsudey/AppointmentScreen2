import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SQLiteProvider } from "expo-sqlite/next";

import Home from "./src/components/Home";

import StudentLogin from "./src/student/StudentLogin";
import StudentMenu from "./src/student/StudentMenu";

import TeacherLogin from "./src/teacher/TeacherLogin";
import TeacherBooking from "./src/teacher/TeacherBooking";
import TeacherMenu from "./src/teacher/TeacherMenu";




const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
  const dbName = "myDB.db";
  const dbAsset = require("./assets/myDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}; 

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Database...</Text>
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home Screen */}
        <Stack.Screen name="Home" component={Home} options={{ title: 'Profil Girişi' }} />

        {/* Teacher Register Screen */}
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} options={{ title: 'Öğretmen Girişi' }}/>
        <Stack.Screen name="TBooking" component={TeacherBooking} options={{ title: 'Randevu Belirle' }} />  
        <Stack.Screen name="TeacherMenu" component={TeacherMenu} options={{ title: 'Menü' }} />  

        {/* Student Register Screen */}
        <Stack.Screen name="StudentLogin" component={StudentLogin} options={{ title: 'Öğrenci Girişi' }} />
        <Stack.Screen name="StudentMenu" component={StudentMenu} options={{ title: 'Menü' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
