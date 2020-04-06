import React from 'react';
import { Keyboard, SafeAreaView, Text, Image, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SignUpCar({ navigation, route, userData }){
  const [make, changeMake] = React.useState('');
  const [model, changeModel] = React.useState('');
  const [color, changeColor] = React.useState('');
  const [license_plate, changePlate] = React.useState('');
  const [state, changeState] = React.useState('');
  const [userId, changeUserId] = React.useState('');
  const [keyProp, changeKeyProp] = React.useState('flex-start');

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
    
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  },[]);

  const _keyboardDidShow = () => {
    changeKeyProp('flex-end');
  };

  const _keyboardDidHide = () => {
    changeKeyProp('flex-start')
  };

  function saveToDB(){
    axios.post(`http://10.0.2.2:8080/vehicle/addVehicle/${userId}`, { make, model,  license_plate, color, state })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log('error', e);
    });

    navigation.navigate('SignUpStripe')
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <SafeAreaView style={styles.container}>
        <View style={[styles.inner, { justifyContent: keyProp}]}>
        <View style={{backgroundColor: "#726D9B", height: 80}}>
          <TouchableOpacity
            style={{ margin: 16, alignSelf: "flex-start", top: 15 }}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={30} color='#E5EBEA' />
          </TouchableOpacity>
          <Image source={require('../images/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.info}>
          <Text style={styles.header}>Sign up for SpotLot</Text>
          <Text style={styles.subtext}>
            If you plan on parking using SpotLot we will need to know some information about your vehicle to tell the lot owners.
          </Text>
          <Text style={styles.header}>Vehicle information</Text>
          <View style={{ top: -90}}>
            <View style={{top: 5}}>
              <Text style={styles.inputHeader}>Vehicle make</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changeMake(text)}
              ></TextInput>
            </View>
            <View style={{top: 10}}>
              <Text style={styles.inputHeader}>Vehicle model</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changeModel(text)}
              ></TextInput>
            </View>
            <View style={{top: 15}}>
              <Text style={styles.inputHeader}>Vehicle color</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changeColor(text)}
              >
              </TextInput>
            </View>
            <View style={{top: 20}}>
              <Text style={styles.inputHeader}>License plate number</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changePlate(text)}
              >
              </TextInput>
            </View>
            <View style={{top: 25}}>
              <Text style={styles.inputHeader}>License plate state</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changeState(text)}
              >
              </TextInput>
            </View>
            <View style={{ top: 70 }}>
              <Button color="#726D9B" title="Continue" onPress={() => saveToDB()} />
            </View>
          </View>
        </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  inner: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 45,
    top: 50
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
  subtextTwo: {
    fontSize: 15,
    color: '#395C6B',
    top: 5
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
    alignSelf: 'center',
    top: -40
  },
})