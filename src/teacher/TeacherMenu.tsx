import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface TeacherMenuProps {
  navigation: any;
}

const TeacherMenu: React.FC<TeacherMenuProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Randevu Belirle"
          onPress={() => navigation.navigate('TBooking')} color="white"
        />
      </View>

      <View style={styles.button}>
      <Button
  title="Randevularım"
  onPress={() => navigation.navigate('TeacherList')} color="white"
/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#130632',
  },
  button: {
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    backgroundColor: '#A391F5',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default TeacherMenu;
