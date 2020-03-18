import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class Search extends Component{
  render() {
    const styles = StyleSheet.create({
      button: {
        alignItems: 'center',
        backgroundColor: '#3FB984',
        padding: 10,
        height: 40,
        width: 40,
        borderRadius: 200,
        position: 'absolute',
        bottom:0,
        right:0,
        margin: 5,
      },
      image: {
        height: 40,
        width: 40,
        borderRadius: 200,
        position: 'absolute',
      },
    });
    return (
        <TouchableOpacity style={styles.button} title={'btn'}>
          <Image
            style={styles.image}
            source={require('../images/search.png')}
          />
        </TouchableOpacity>
    );
  }
}