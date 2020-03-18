import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default function SignUpCar({ navigation }){
  const [make, changeMake] = React.useState('');
  const [model, changeModel] = React.useState('');
  const [color, changeColor] = React.useState('');
  const [number, changeNumber] = React.useState('');
  const [state, changeState] = React.useState('');

  //NEED TO ADD A BACK BUTTON

  function saveToDB(){
    //SAVE TO DB
    navigation.navigate('MapContainer')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up for SpotLot</Text>
      <Text style={styles.subtext}>
        If you plan on parking using SpotLot we will need to know some information about your car to tell the lot owners.
      </Text>
      <Text style={styles.header}>Car information</Text>
      <View style={{ top: -90}}>
        <Text style={styles.inputHeader}>Car make</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => changeMake(text)}
        ></TextInput>
        <Text style={styles.inputHeader}>Car model</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => changeModel(text)}
        ></TextInput>
        <Text style={styles.inputHeader}>Car color</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => changeColor(text)}
        >
        </TextInput>
        <Text style={styles.inputHeader}>License plate number</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => changeNumber(text)}
        >
        </TextInput>
        <Text style={styles.inputHeader}>License plate state</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => changeState(text)}
        >
        </TextInput>
        <View style={{ top: 20 }}>
          <Button color="#394648" title="Continue" onPress={() => saveToDB()} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3fb984',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 55,
  },
  header: {
    fontSize: 25,
    color: '#E5EBEA',
    top: -80,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  subtext: {
    fontSize: 15,
    color: '#E5EBEA',
    top: -70,
    marginBottom: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5EBEA',
    bottom: 5,
    color: '#E5EBEA',
    width: 300,
    top: 10
  },
  inputHeader: {
    color: '#E5EBEA',
    bottom: 5,
    top: 10
  },
})