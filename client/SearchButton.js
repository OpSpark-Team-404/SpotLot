import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class Search extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { clickFunc } = this.props;
    return (
        <TouchableOpacity 
          style={styles.button}
          title={'btn'}
          onPress={()=>{clickFunc()}}
        >
          <Image
            style={styles.image}
            source={require('../images/search.png')}
          />
        </TouchableOpacity>
    );
  }
}