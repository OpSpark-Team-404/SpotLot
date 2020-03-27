import React from 'react';
import { Text, Image, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SignUpCar({ navigation, route, userData }){
  const [make, changeMake] = React.useState('');
  const [model, changeModel] = React.useState('');
  const [color, changeColor] = React.useState('');
  const [plate, changePlate] = React.useState('');
  const [state, changeState] = React.useState('');
  const [userId, changeUserId] = React.useState('');

  React.useEffect(() => {
    const { email } = route.params;
    userData(email);
    axios.get(`http://10.0.2.2:8080/user/selectUser/${email}`)
      .then((res) => {
        changeUserId(res.data.id);
      })
      .catch((e) => {
        console.log('error', e);
      });
  });

  function saveToDB(){
    axios.post(`http://10.0.2.2:8080/vehicle/addVehicle/${userId}`, { make, model, color, plate, state })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log('error', e);
    });

    const pushAction = StackActions.push('Login')
    navigation.dispatch(pushAction);
    navigation.navigate('Map')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", margin: 16, top: -50, left: -50  }}
        onPress={() => navigation.goBack()}
        >
        <FontAwesome5 name="arrow-left" size={26} color='#3fb984' />
      </TouchableOpacity>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.header}>Sign up for SpotLot</Text>
      <Text style={styles.subtext}>
        If you plan on parking using SpotLot we will need to know some information about your vehicle to tell the lot owners.
      </Text>
      <Text style={styles.header}>Vehicle information</Text>
      <View style={{ top: -90}}>
        <View style={{top: 5}}>
          <Text style={styles.inputHeader}>Vehicle make</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeMake(text)}
          ></TextInput>
        </View>
        <View style={{top: 10}}>
          <Text style={styles.inputHeader}>Vehicle model</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeModel(text)}
          ></TextInput>
        </View>
        <View style={{top: 15}}>
          <Text style={styles.inputHeader}>Vehicle color</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeColor(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 20}}>
          <Text style={styles.inputHeader}>License plate number</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changePlate(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 25}}>
          <Text style={styles.inputHeader}>License plate state</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeState(text)}
          >
          </TextInput>
        </View>
        <View style={{ top: 70 }}>
          <Button color="#726D9B" title="Complete" onPress={() => saveToDB()} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 45,
  },
  header: {
    fontSize: 25,
    color: '#395C6B',
    top: -80,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  subtext: {
    fontSize: 15,
    color: '#395C6B',
    top: -70,
    marginBottom: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 325,
    top: 12,
    backgroundColor: 'white',
  },
  inputHeader: {
    color: '#394648',
    bottom: 5,
    top: 10
  },
  logo: {
    height: 50,
    width: 50,
    top: -105
  }
})