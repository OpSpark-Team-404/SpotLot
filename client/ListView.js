import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default class lotInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {

    const fakeData = [
      {
        name: 'lotname',
        location: '123 test',
        price: 20,
        distance: '5 miles',
      },
      {
        name: 'lotname',
        location: '123 test',
        price: 20,
        distance: '5 miles',
      },
      {
        name: 'lotname',
        location: '123 test',
        price: 20,
        distance: '5 miles',
      },
      {
        name: 'lotname',
        location: '123 test',
        price: 20,
        distance: '5 miles',
      },
      {
        name: 'lotname',
        location: '123 test',
        price: 20,
        distance: '5 miles',
      },
      {
        name: 'lotname',
        location: '123 test',
        price: 20,
        distance: '5 miles',
      },
      {
        name: 'lotname',
        location: '123 test',
        price: 20,
        distance: '5 miles',
      },
    ]

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
        marginBottom: 25,
        flexDirection: 'row'
      }
    });
    

    return (
      <View style={{marginHorizontal:20}}>
        {fakeData.map((lot) => (
          <View style={styles.lotInfo}>
            <FontAwesome5 name="car" size={36} color='#3FB984' />
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 20}}>{lot.name}</Text>
              <Text>{lot.location}</Text>
            </View>
            <View style={{marginLeft: '35%',}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{lot.price} | 6 hours</Text>
              <Text>{lot.distance}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}