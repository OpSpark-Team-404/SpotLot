import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MySpot({navigation}){

  const fakeData = [
    {
      address: '4876 Blueberry Lane',
      price: 15,
      time: '10:00 PM',
    },
    {
      address: '8965 Sunflower Road',
      price: 30,
      time: '12:00 PM',
    },
    {
      address: '4876 Blueberry Lane',
      price: 15,
      time: '10:00 PM',
    },
 
  ]

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: "#726D9B", height: 80}}>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-start", top: 15 }}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={30} color='#E5EBEA' />
        </TouchableOpacity>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </View>
      <View style={{padding: 55}}>
        <View style={{marginBottom: -20, top: 10}}>
          <Text style={styles.header}>My Spots</Text>
        </View>
        <Text style={styles.subHeader}>Current Spot</Text>
        <View style={{ backgroundColor: "#726D9B", width: 300, height: 80, borderRadius: 5 }}>
          <View style={{flexDirection: 'row', left: 25, top: 5}}>
            <FontAwesome5 name="car" size={36} color='#3FB984' />
            <Text style={{alignSelf: 'center', padding: 10, color: '#E5EBEA'}}>Address</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{left: 25, bottom: -10, color: '#E5EBEA'}}>Price</Text>
            <Text style={{left: 160, bottom: -10, color: '#E5EBEA'}}>Closing Time</Text>
          </View>
        </View>
        <View style={{top: 30}}>
          <Text style={styles.subHeader}>Spot History</Text>
          {fakeData.map((lot) => (
            <View style={{flexDirection: 'row', padding: 10}}>
              <View>
                <Text>{lot.address}</Text>
                <Text>{`$${lot.price}`}</Text>
              </View>
              <View style={{justifyContent: 'flex-end', left: 90}}>
                <Text>{lot.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  header: {
    fontSize: 25,
    color: '#394648',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: -55,
  },
  subHeader: {
    fontSize: 20,
    color: '#394648',
    fontWeight: 'bold',
    bottom: 5
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  }
})