import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

export default function ReserveSpot({ navigation, user, route, userData }){
  const [name, changeName] = React.useState('');
  const [number, changeNumber] = React.useState('');
  const [expiration, changeExpiration] = React.useState('');
  const [cvc, changeCVC] = React.useState('');
  const [zip, changeZip] = React.useState('');

  function saveToDB(){
    const lotId = route.params.lotId;

    axios.post(`http://10.0.2.2:8080/spot/addSpot/${lotId}/${user.id}`)
      .then((res) => {
        console.log(res);
        const spot_open = lotId
        axios.patch(`http://10.0.2.2:8080/user/patchUserSpot/${user.id}`, { spot_open })
            .then(() => userData(user.email))
            .catch(err => console.log(err))
      })
      .catch((e) => {
        console.log('error', e);
      });

    navigation.navigate('MapContainer')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", margin: 16, left: -60, top: -180 }}
        onPress={() => navigation.goBack()}
        >
        <FontAwesome5 name="arrow-left" size={24} color='#3fb984' />
      </TouchableOpacity>
      <Text style={styles.header}>Credit card information</Text>
      <View style={{ top: -200}}>
        <View style={{top: 5}}>
          <Text style={styles.inputHeader}>Credit card name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeName(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 10}}>
          <Text style={styles.inputHeader}>Credit card number</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeNumber(text)}
          >
          </TextInput>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{top: 15}}>
            <Text style={styles.inputHeader}>Exp.</Text>
            <TextInput
              style={styles.smallInput}
              onChangeText={text => changeExpiration(text)}
            >
            </TextInput>
          </View>
          <View style={{top: 15}}>
            <Text style={styles.inputHeader}>CVC</Text>
            <TextInput
              style={styles.smallInput}
              onChangeText={text => changeCVC(text)}
            >
            </TextInput>
          </View>
          <View style={{top: 15}}>
            <Text style={styles.inputHeader}>Zip</Text>
            <TextInput
              style={styles.smallInput}
              onChangeText={text => changeZip(text)}
            >
            </TextInput>
          </View>
        </View>
        <View style={{ top: 60 }}>
          <Button color="#726D9B" title="Reserve Spot" onPress={() => saveToDB()} />
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
    padding: 55,
  },
  header: {
    fontSize: 25,
    color: '#222222',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: -200
  },
  inputHeader: {
    color: '#222222',
    bottom: 5,
    top: 10
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 300,
    top: 10,
    backgroundColor: 'white',
  },
  smallInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 90,
    top: 10,
    backgroundColor: 'white',
  }
})