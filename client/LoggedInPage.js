import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const LoggedInPage = props => {
  return (
    <View>
      <Text style={styles.header}>Welcome: {props.name}</Text>
      <Image style={styles.photoImage} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  photoImage: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150
  },
  header: {
    fontSize: 25,
    color: '#E5EBEA',
  },
})

export default LoggedInPage;