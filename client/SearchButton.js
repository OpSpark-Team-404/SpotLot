import React, {Component} from 'react';
import { FontAwesome5 } from "@expo/vector-icons";
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
      <View>
        {this.props.reserved ? (
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              top: 460,
              right: 25
            }}
            onPress={() => navigation.openDrawer()}
          >
            <FontAwesome5 name="location-arrow" size={30} color="#3fb984" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              top: 460,
              right: 25
            }}
            onPress={() => navigation.openDrawer()}
          >
            <FontAwesome5 name="location-arrow" size={30} color="#395C6B" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}