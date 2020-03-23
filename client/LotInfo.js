import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
export default function LotInfo({ navigation, route }){

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
        marginTop: 20,
        marginHorizontal: 30,
        flexDirection: 'row'
      }
    });
    
    const {
      id,
      current_spots,
      max_spots,
      price,
      description,
    } = route.params.lot
    return (
      <View style={{marginTop: 20}}>
        <Text style={styles.nameText} >{`${id}'s lot`}</Text>
        <Image style={styles.image} source={require('../images/ThumbnailImage.png')}/>
        <View style={styles.lotInfo}>
          <FontAwesome5 name="car" size={36} color='#3FB984' />
          <View>
            <Text style={{marginLeft: 30, fontSize: 24}} >{`${max_spots} / ${current_spots}`}</Text>
            <Text style={{marginLeft: 20,}} >open spots</Text>
          </View>
          <Text style={{marginLeft: '15%', fontSize: 30}} >{`$${price} | 6 hours`}</Text>
        </View>
        <Text style={{fontSize: 20, marginHorizontal: 15, marginVertical: 25,}} >{`${description}`}</Text>
        <Button color='#726D9B' title='Reserve Spot'></Button>
      </View>
    );
  }