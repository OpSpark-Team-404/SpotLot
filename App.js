import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginPage from './client/LoginPage';
import LoggedInPage from './client/LoggedInPage';
import * as Google from 'expo-google-app-auth';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: '',
      photoUrl: ''
    }
  }

  signIn = async() => {
    try {
      const result = await Google.logInAsync({
        // HIDE KEY IN ANOTHER FILE
        androidClientId: '59381228740-ivnr7ahll9433s7op8kbmpft858pc6or.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
        })
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  render(){
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3fb984',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
