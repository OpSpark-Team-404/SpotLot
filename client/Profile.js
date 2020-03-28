import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile({ navigation, user }){

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
      <View style={{alignItems: 'center'}}>
        <Image style={styles.photoImage} source={{ uri: user.image_url }} />
        <View style={{marginBottom: 20, marginTop: 20}}>
          <Text style={styles.inputHeader}>Username</Text>
          <Text style={styles.box}>{user.name}</Text>
        </View>
        <View>
          <Text style={styles.inputHeader}>Phone Number</Text>
          <Text style={styles.box}>{user.phone}</Text>
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
  photoImage: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: '#3fb984',
    borderWidth: 3,
    borderRadius: 150,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  },
  box: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    bottom: 5,
    color: '#394648',
    width: 200,
    top: 12,
    height: 30,
    backgroundColor: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
  inputHeader: {
    color: '#394648',
    bottom: 5,
    top: 10
  },
});