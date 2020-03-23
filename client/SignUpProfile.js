import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

export default function SignUpProfile({ route, navigation }){
  const [firstName, changeFirstName] = React.useState('');
  const [lastName, changeLastName] = React.useState('');
  const [bio, changeBio] = React.useState('');
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
    
    axios.post('http://10.0.2.2:8080/user/addUser', { name, email, google_token, image_url, bio })
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
      <TouchableOpacity
        style={{ alignSelf: "flex-start", margin: 16, top: -80, left: -60 }}
        onPress={() => navigation.goBack()}
        >
        <FontAwesome5 name="arrow-left" size={24} color='#3fb984' />
      </TouchableOpacity>
      <Text style={styles.header}>Sign up for SpotLot</Text>
      <Text style={styles.subtext}>
        Thank you for signing up for SpotLot using your Google account! We still need some information from you to complete your account.
      </Text>
      <Text style={styles.header}>Profile</Text>
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
          <Text style={styles.inputHeader}>Bio</Text>
          <TextInput
            style={styles.bio}
            onChangeText={text => changeBio(text)}
            multiline={true}
            numberOfLines={5}
          >
          </TextInput>
        </View>
        <View style={{ top: 40 }}>
          <Button color="#726D9B" title="Continue" onPress={() => saveToDB()}></Button>
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
    padding: 55
  },
  inputContainer: {
    bottom: 10
  },
  header: {
    fontSize: 25,
    color: '#222222',
    top: -80,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  subtext: {
    fontSize: 15,
    color: '#222222',
    top: -70,
    marginBottom: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    bottom: 5,
    color: '#222222',
    width: 300,
    top: 10,
    backgroundColor: 'white'
  },
  inputHeader: {
    color: '#222222',
    bottom: 5,
    top: 10
  },
  bio : {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    top: 10
  },
  scrollView: {
    paddingHorizontal: 20,
  }
})