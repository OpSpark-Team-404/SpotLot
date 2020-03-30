import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function lotInfo({navigation}){

  const fakeData = [
    {
      address: '2604 Magazine Street, New Orleans, Louisiana',
      time: '10:00 PM',
      price: 20,
    },
    {
      address: '2604 Magazine Street, New Orleans, Louisiana',
      time: '10:00 PM',
      price: 20,
    },
    {
      address: '2604 Magazine Street, New Orleans, Louisiana',
      time: '10:00 PM',
      price: 20,
    },
    {
      address: '2604 Magazine Street, New Orleans, Louisiana',
      time: '10:00 PM',
      price: 20,
    },
    {
      address: '2604 Magazine Street, New Orleans, Louisiana',
      time: '10:00 PM',
      price: 20,
    },
    {
      address: '2604 Magazine Street, New Orleans, Louisiana',
      time: '10:00 PM',
      price: 20,
    }
  ]
    
  return (
    <View>
      <View style={{backgroundColor: "#726D9B", height: 80}}>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-start", top: 15 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={30} color='#E5EBEA' />
        </TouchableOpacity>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <TouchableOpacity
          style={{ alignSelf: "flex-end", margin: 16, top: -98 }}
          // onPress={}
        >
          <FontAwesome5 name="sort" size={35} color='#E5EBEA' />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal:20}}>
        <ScrollView style={{top: 10}}>
          {fakeData.map((lot) => (
            <View style={styles.lotInfo}>
              <FontAwesome5 name="car" size={36} color='#3FB984' style={{top: 10}} />
              <View style={{padding: 10}}>
                <Text style={{fontSize: 20}}>{lot.address}</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{lot.time}</Text>
                <Text style={{fontSize: 20}}>{`$${lot.price}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameText:{
    fontSize: 30,
    marginLeft: 15,
    fontWeight: 'bold'
  },
  image:{
    marginTop: 15,
    height: 200,
    width: '100%'
  },
  lotInfo:{
    marginBottom: 15,
    flexDirection: 'row'
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  }
});