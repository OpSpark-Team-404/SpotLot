import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Settings({ navigation }){

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
        <Text style={styles.header}>Settings</Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="user-alt" size={30} color="#726D9B" />
              <View style={{justifyContent: 'center'}}>
                <Text style={{color: "#726D9B", fontSize: 18, left: 15}}>Profile Information</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 2, borderBottomColor: '#A9B4C2', top: 10}}></View>
        <View style={{top: 30}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Vehicle")}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="car" size={30} color="#726D9B" />
              <View style={{justifyContent: 'center'}}>
                <Text style={{color: "#726D9B", fontSize: 18, left: 15}}>Vehicle Information</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 2, borderBottomColor: '#A9B4C2', top: 35}}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  },
  header: {
    fontSize: 25,
    color: '#394648',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: -35
  },
});