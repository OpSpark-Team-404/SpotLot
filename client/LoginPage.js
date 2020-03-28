import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { key } from '../supersecret'

export default function LoginPage({ navigation, route, userData }){
  const [buttonDisabled, onButtonPress] = React.useState(false);

  signIn = async(char) => {
    if(!buttonDisabled){
      onButtonPress(true)
      try {
        const result = await Google.logInAsync({
          androidClientId: key,
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
          const { email, photoUrl, name } = result.user;
          if(char === 'A'){
            userData(email);
            navigation.navigate('Map')
          }
          if(char === 'B'){
            navigation.navigate('SignUpProfile', {
              photoUrl: photoUrl,
              email: email,
              token: result.idToken,
              route: route,
              name: name,
            });
          }
        } else {
          console.log('cancelled');
        }
      } catch (e) {
        console.log('error', e);
      }
      setTimeout(() => {
        onButtonPress(false);
      }, 3000)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.image} />
      <Text style={styles.text}>SpotLot</Text>
      <Text style={styles.subtext}>Find a <Text style={styles.spotlot}>spot,</Text> rent a <Text style={styles.spotlot}>lot</Text></Text>
      <View style={styles.button}>
        <Button color='#726D9B' style={styles.button} title="Sign In with Google" onPress={() => signIn('A')} />
      </View>
      <View style={styles.button}>
        <Button color='#726D9B' uppercase={false} title="Sign Up with Google" onPress={() => signIn('B')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtext: {
    color: '#395C6B',
    fontSize: 25,
    textAlign: 'center',
    top: -85,
    fontStyle: 'italic'
  },
  text: {
    color: '#395C6B',
    fontSize: 50,
    top: -95,
    fontWeight: 'bold'
  },
  image: {
    width: 135,
    height: 135,
    resizeMode: 'contain',
    top: -80
  },
  spotlot: {
    color: '#3FB984',
    fontWeight: 'bold',
  },
  button: {
    width: 300,
    padding: 10,
  },
});
