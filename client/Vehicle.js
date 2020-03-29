import React from 'react';
import { Text, Image, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SignUpCar({ navigation }){
  const [make, changeMake] = React.useState('');
  const [model, changeModel] = React.useState('');
  const [color, changeColor] = React.useState('');
  const [plate, changePlate] = React.useState('');
  const [state, changeState] = React.useState('');
  const [edit, changeEditStatus] = React.useState(false);

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
      {edit ?
      <View style={styles.info}>
        <Text style={styles.header}>Vehicle Information</Text>
        <View style={{ top: -90}}>
          <View style={{top: 5}}>
            <Text style={styles.inputHeader}>Vehicle make</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => changeMake(text)}
            ></TextInput>
          </View>
          <View style={{top: 10}}>
            <Text style={styles.inputHeader}>Vehicle model</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => changeModel(text)}
            ></TextInput>
          </View>
          <View style={{top: 15}}>
            <Text style={styles.inputHeader}>Vehicle color</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => changeColor(text)}
            >
            </TextInput>
          </View>
          <View style={{top: 20}}>
            <Text style={styles.inputHeader}>License plate number</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => changePlate(text)}
            >
            </TextInput>
          </View>
          <View style={{top: 25}}>
            <Text style={styles.inputHeader}>License plate state</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => changeState(text)}
            >
            </TextInput>
          </View>
        </View>
        <View style={{top: -30, left: -20}}>
          <TouchableOpacity
            onPress={() => changeEditStatus(!edit)}
          > 
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="check-square" size={30} color="#726D9B" />
              <View style={{alignSelf: 'flex-end'}}>
                <Text style={{fontWeight: 'bold', left: 10, color: "#726D9B"}}>Confirm vehicle information</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      : 
      <View style={styles.info}>
        <Text style={styles.header}>Vehicle Information</Text>
        <View style={{ top: -90}}>
          <View style={{top: 5}}>
            <Text style={styles.inputHeader}>Vehicle make</Text>
            <Text
              style={styles.text}
            >Test</Text>
          </View>
          <View style={{top: 10}}>
            <Text style={styles.inputHeader}>Vehicle model</Text>
            <Text
              style={styles.text}
            >Test</Text>
          </View>
          <View style={{top: 15}}>
            <Text style={styles.inputHeader}>Vehicle color</Text>
            <Text
              style={styles.text}
            >Test</Text>
          </View>
          <View style={{top: 20}}>
            <Text style={styles.inputHeader}>License plate number</Text>
            <Text
              style={styles.text}
            >Test</Text>
          </View>
          <View style={{top: 25}}>
            <Text style={styles.inputHeader}>License plate state</Text>
            <Text
              style={styles.text}
            >Test</Text>
          </View>
        </View>
        <View style={{top: -30, left: -20}}>
          <TouchableOpacity
            onPress={() => changeEditStatus(!edit)}
          > 
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="edit" size={30} color="#726D9B" />
              <View style={{alignSelf: 'flex-end'}}>
                <Text style={{fontWeight: 'bold', left: 10, color: "#726D9B"}}>Edit vehicle information</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 45,
    top: 50
  },
  header: {
    fontSize: 25,
    color: '#395C6B',
    top: -80,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  subtext: {
    fontSize: 15,
    color: '#395C6B',
    top: -70,
    marginBottom: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 325,
    top: 12,
    backgroundColor: 'white',
  },
  text: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 325,
    top: 12,
    backgroundColor: 'white',
    height: 32,
    textAlignVertical: 'center',
  },
  inputHeader: {
    color: '#394648',
    bottom: 5,
    top: 10
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  },
})