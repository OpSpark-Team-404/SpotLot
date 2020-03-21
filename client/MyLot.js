import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MyLot({ navigation }){

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-start", top: 20 }}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={30} color='#3fb984' />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-end", top: 20 }}
          onPress={() => navigation.navigate('CreateLot')}
        >
          <FontAwesome5 name="plus-circle" size={30} color='#3fb984' />
        </TouchableOpacity>
      </View>
      <Text style={{justifyContent: 'center', alignSelf: "center" }}>MyLot</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
})