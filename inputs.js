import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { storeData } from './database';

export default function Inputs() {
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

    const submit = () => {
        const data = {
            name,
            surname,
            date: date.toLocaleDateString('en-GB'), // Format date as DD/MM/YYYY
        };
        console.log('Submitted data:', data);
        storeData(data);
        };
    

  return (
    <View style={styles.container}>
      <Text>Bilgileri giriniz:</Text>
      
      <Text>Ad:</Text>
      <TextInput style={styles.input} placeholder="Adınızı giriniz" value={name} onChangeText={setName}/>
      
      <Text>Soyad:</Text>
      <TextInput style={styles.input} placeholder="Soyadınızı giriniz" value={surname} onChangeText={setSurname}/>
      
      <Text>Doğum Tarihi:</Text>
      <TextInput style={styles.input} placeholder="Doğum tarihi giriniz" onPress={showDatepicker} value={formatDate(date)} onChangeText={setDate} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}      
      <Button title='Ekle' onPress={submit}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
});