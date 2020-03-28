import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
export default function LotInfo({ navigation, route }){
    
  const { current_spots, max_spots, price, lot_close, description, image_url } = route.params.lot
  
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
      <View style={{padding: 30}}>
        <Image style={styles.image} source={{ uri: image_url }}/>
        <View style={styles.lotInfo}>
          <FontAwesome5 name="car" size={36} color='#3FB984' />
          <View>
            <Text style={{marginLeft: 20, fontSize: 24}} >{`${current_spots} / ${max_spots}`}</Text>
            <Text style={{marginLeft: 10,}}>open spots</Text>
          </View>
          <Text style={{fontSize: 24, left: 50, fontWeight: 'bold'}} >{`$${price}`}</Text>
          <Text style={{fontSize: 24, left: 100, width: 125}} >{`${lot_close}`}</Text>
        </View>
        <Text style={{fontSize: 20, marginHorizontal: 15, marginBottom: 30}} >{`${description}`}</Text>
        <Button color='#726D9B' title='Reserve Spot' onPress={() => navigation.navigate('Reserve')}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image:{
    height: 200,
    width: '100%'
  },
  lotInfo:{
    marginTop: 20,
    flexDirection: 'row'
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  }
});