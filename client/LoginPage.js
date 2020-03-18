import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { key } from '../supersecret'

export default function LoginPage({ navigation }){
  const [name, onChangeName] = React.useState('');
  const [photoUrl, onChangePhotoUrl] = React.useState('');

  signIn = async(char) => {
    try {
      const result = await Google.logInAsync({
        androidClientId: key,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onChangeName(result.user.name);
        onChangePhotoUrl(result.user.photoUrl);
        if(char === 'A'){
          navigation.navigate('MapContainer')
        }
        if(char === 'B'){
          navigation.navigate('SignUpProfile')
        }
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../images/spotlot3.png')} style={styles.image} />
      <Text style={styles.text}>SpotLot</Text>
      <Text style={styles.subtext}>find a <Text style={styles.spotlot}>spot</Text>, rent a <Text style={styles.spotlot}>lot</Text></Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Have an account?</Text>
        <Button style={styles.button} title="Sign In with Google" onPress={() => signIn('A')} />
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Need an account?</Text>
        <Button title="Sign Up with Google" onPress={() => signIn('B')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3fb984',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtext: {
    color: '#E5EBEA',
    fontSize: 15,
    textAlign: 'center',
    top: -25,
  },
  text: {
    color: '#E5EBEA',
    fontSize: 50,
    top: -40,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain'
  },
  spotlot: {
    color: '#726D9B',
    fontWeight: 'bold'
  },
  button: {
    width: 200,
    padding: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#E5EBEA',
    fontStyle: 'italic'
  }
});
