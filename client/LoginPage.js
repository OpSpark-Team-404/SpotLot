import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const LoginPage = props => {
  return (
    <View>
      <Image source={require('../images/spotlot3.png')} style={styles.image} />
      <Text style={styles.text}>SpotLot</Text>
      <Text style={styles.subtext}>find a <Text style={styles.spotlot}>spot</Text>, rent a <Text style={styles.spotlot}>lot</Text></Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default LoginPage;
