import React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

export default function SignUpProfile({ navigation }){
  const [firstName, changeFirstName] = React.useState('');
  const [lastName, changeLastName] = React.useState('');
  const [bio, changeBio] = React.useState('');

  function saveToDB(){
    //SAVE TO DB
    navigation.navigate('SignUpCar')
  }

  return (
    <View style={styles.container}>
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
        <Text style={styles.inputHeader}>Last Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => changeLastName(text)}
        ></TextInput>
        <Text style={styles.inputHeader}>Bio</Text>
        <TextInput
          style={styles.bio}
          onChangeText={text => changeBio(text)}
          multiline={true}
          numberOfLines={5}
        >
        </TextInput>
        <View style={{ top: 20 }}>
          <Button color="#394648" title="Continue" onPress={() => saveToDB()}></Button>
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
    padding: 55
  },
  inputContainer: {
    bottom: 10
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
    top: 10,
  },
  inputHeader: {
    color: '#E5EBEA',
    bottom: 5,
    top: 10
  },
  bio : {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5EBEA',
    textAlignVertical: 'top',
    color: '#E5EBEA',
    top: 10
  }
})