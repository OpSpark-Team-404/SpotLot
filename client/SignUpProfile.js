import React from 'react';
import { Text, View, Image, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

export default function SignUpProfile({ route, navigation }){
  const [firstName, changeFirstName] = React.useState('');
  const [lastName, changeLastName] = React.useState('');
  const [phone, changePhone] = React.useState('');
  const [email, changeEmail] = React.useState('');
  const [google_token, changeToken] = React.useState('');
  const [image_url, changePhotoUrl] = React.useState('');

  React.useEffect(() => {
    changePhotoUrl(route.params.photoUrl);
    changeEmail(route.params.email);
    changeToken(route.params.token);
  });

  function saveToDB(){
    // Make it so you can skip name and bio
    // make if statements if user decideds to skip adding name and bio and just use google name
    // need to delete user from database if they hit the back button

    const name = `${firstName} ${lastName}`;
    const spot_open = 0;
    const lot_open = 0;
    
    axios.post('http://10.0.2.2:8080/user/addUser', { name, email, google_token, image_url, spot_open, lot_open, phone })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('error', e);
      });

    navigation.navigate('SignUpCar', {
      route: route,
      email: email
    });
  }

  return (
    <View style={styles.container}>
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
          Thank you for signing up for SpotLot using your Google account! We still need some information from you to complete your account.
        </Text>
        <Text style={styles.header}>Profile information</Text>
        <View style={{ top: -90}}>
          <Text style={styles.inputHeader}>First Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeFirstName(text)}
          ></TextInput>
          <View style={{top: 5}}>
            <Text style={styles.inputHeader}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => changeLastName(text)}
            ></TextInput>
          </View>
          <View style={{top: 10}}>
            <Text style={styles.inputHeader}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => changePhone(text)}
            >
            </TextInput>
          </View>
          <View style={{ top: 60 }}>
            <Button color="#726D9B" title="Continue" onPress={() => saveToDB()}></Button>
          </View>
        </View>
      </View>
    </View>
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
  inputContainer: {
    bottom: 10
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
    bottom: 5,
    color: '#222222',
    width: 325,
    top: 12,
    backgroundColor: 'white'
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