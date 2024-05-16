import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';
import { date, time } from "../types";

const db = SQLite.openDatabaseSync('myDB.db');

const TeacherBooking: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<time>(new Date());
  const [selectedDate, setSelectedDate] = useState<date>(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const loadedAppointments = await fetchAppointments();
      setAppointments(loadedAppointments);
    } catch (error) {
      Alert.alert("Error", "Failed to load appointments: " + error.message);
    }
  };

  const fetchAppointments = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql("SELECT * FROM Appointments", [], (_, { rows }) => {
          const appointments = [];
          for (let i = 0; i < rows.length; i++) {
            appointments.push(rows.item(i));
          }
          resolve(appointments);
        }, (_, error) => {
          reject(error);
        });
      });
    });
  };

  const addAppointment = async (date, time) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql("INSERT INTO Appointments (date, time) VALUES (?, ?)", [date, time], (_, { insertId }) => {
          resolve(insertId);
        }, (_, error) => {
          reject(error);
        });
      });
    });
  };

  const deleteAppointment = async (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql("DELETE FROM Appointments WHERE id = ?", [id], () => {
          resolve();
        }, (_, error) => {
          reject(error);
        });
      });
    });
  };

  const handleDateTimeChange = (event, dateTime) => {
    setShowDateTimePicker(false);
    if (dateTime) {
      setSelectedDate(dateTime);
      setSelectedTime(dateTime);
    }
  };

  const handleSaveAppointment = async () => {
    const formattedDate = selectedDate.toISOString().substring(0, 10);
    const formattedTime = selectedTime.toISOString().substring(11, 19);
    try {
      await addAppointment(formattedDate, formattedTime);
      await loadAppointments();
      Alert.alert(" ", "Appointment successfully saved.");
    } catch (error) {
      Alert.alert("Error", "An error occurred while saving the appointment: " + error.message);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      await loadAppointments();
      Alert.alert("Success", "Appointment successfully deleted.");
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the appointment: " + error.message);
    }
  };

  const renderAppointmentItem = ({ item }) => {
    const fullDateTime = new Date(item.date + 'T' + item.time);
    return (
      <View style={styles.appointmentItem}>
        <Text>{fullDateTime.toLocaleDateString('en-CA')}</Text>
        <Text>{fullDateTime.toLocaleTimeString('it-IT')}</Text>
        <Button title="Delete" onPress={() => handleDeleteAppointment(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal visible={showDateTimePicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DateTimePicker
              value={selectedTime}
              mode="datetime"
              is24Hour={true}
              onChange={handleDateTimeChange}
            />
            <Button title="Kapat" onPress={() => setShowDateTimePicker(false)} color="white" />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button title="Tarih ve Saat Seç" onPress={() => setShowDateTimePicker(true)} color="white" />
      </View>
      <View style={styles.buttonContainer2}>
      <Button title="Seçimi Kaydet" onPress={handleSaveAppointment} color="white" /></View>
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#130632',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    backgroundColor: '#A391F5',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonContainer: {
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    backgroundColor: '#A391F5',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',

  },
  buttonContainer2: {
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#A391F5',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  appointmentItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});

export default TeacherBooking;
