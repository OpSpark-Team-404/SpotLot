import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginPage from './client/LoginPage';
import Profile from './client/Profile';
import * as Google from 'expo-google-app-auth';
import { key } from './supersecret';
import MapContainer from './client/MapContainer';

export default function App(){
  const [signedIn, onChangeSignIn] = React.useState(false);
  const [name, onChangeName] = React.useState('');
  const [photoUrl, onChangePhotoUrl] = React.useState('');

  signIn = async() => {
    try {
      const result = await Google.logInAsync({
        androidClientId: key,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onChangeSignIn(true);
        onChangeName(result.user.name);
        onChangePhotoUrl(result.user.photoUrl);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  return (
    <View style={styles.container}>
      {signedIn ? (
        <MapContainer />
      ) : (
        <LoginPage signIn={signIn} />
      )}
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
});
