import React from 'react';
import { Text, Image, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Keyboard } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Vehicle({ navigation, user }) {
  const [make, changeMake] = React.useState('');
  const [model, changeModel] = React.useState('');
  const [color, changeColor] = React.useState('');
  const [license_plate, changePlate] = React.useState('');
  const [state, changeState] = React.useState('');
  const [id, changeId] = React.useState('');
  const [car, changeCar] = React.useState('');
  const [keyProp, changeKeyProp] = React.useState('flex-start');

  React.useEffect(() => {
    grabUserCar();

    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    changeKeyProp('flex-end');
  };

  const _keyboardDidHide = () => {
    changeKeyProp('flex-start')
  };

  const grabUserCar = () => {
    axios.get(`http://10.0.2.2:8080/vehicle/selectVehicle/${user.id}`)
      .then(async res => {
        let data = await res.data;
        changeCar(data);
        changeMake(data.make);
        changeModel(data.model);
        changeColor(data.color);
        changePlate(data.license_plate);
        changeState(data.state);
        changeId(data.id);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const updateVehicle = () => {
    axios.patch(`http://10.0.2.2:8080/vehicle/patchVehicle/${id}`, { make, model, license_plate, color, state })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("error", error);
      });
    
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <View style={styles.container}>
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
            <Text style={styles.header}>Vehicle Information</Text>
            <View style={{ top: -90}}>
              <View style={{top: 5}}>
                <Text style={styles.inputHeader}>Vehicle make</Text>
                <TextInput
                  paddingLeft={5}
                  style={styles.textInput}
                  placeholder={car.make}
                  placeholderTextColor={'#222222'}
                  onChangeText={text => changeMake(text)}
                ></TextInput>
              </View>
              <View style={{top: 10}}>
                <Text style={styles.inputHeader}>Vehicle model</Text>
                <TextInput
                  paddingLeft={5}
                  style={styles.textInput}
                  placeholder={car.model}
                  placeholderTextColor={'#222222'}
                  onChangeText={text => changeModel(text)}
                ></TextInput>
              </View>
              <View style={{top: 15}}>
                <Text style={styles.inputHeader}>Vehicle color</Text>
                <TextInput
                  paddingLeft={5}
                  style={styles.textInput}
                  placeholder={car.color}
                  placeholderTextColor={'#222222'}
                  onChangeText={text => changeColor(text)}
                >
                </TextInput>
              </View>
              <View style={{top: 20}}>
                <Text style={styles.inputHeader}>License plate number</Text>
                <TextInput
                  paddingLeft={5}
                  style={styles.textInput}
                  placeholder={car.license_plate}
                  placeholderTextColor={'#222222'}
                  onChangeText={text => changePlate(text)}
                >
                </TextInput>
              </View>
              <View style={{top: 25}}>
                <Text style={styles.inputHeader}>License plate state</Text>
                <TextInput
                  paddingLeft={5}
                  style={styles.textInput}
                  placeholder={car.state}
                  placeholderTextColor={'#222222'}
                  onChangeText={text => changeState(text)}
                >
                </TextInput>
              </View>
            </View>
          </View>
          <View style={{ top: -20, width: 320, alignSelf: 'center' }}>
            <Button color="#726D9B" title="Confirm vehicle changes" onPress={() => updateVehicle()}></Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
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
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 325,
    top: 12,
    backgroundColor: 'white',
  },
  text: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 325,
    top: 12,
    backgroundColor: 'white',
    height: 32,
    textAlignVertical: 'center',
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