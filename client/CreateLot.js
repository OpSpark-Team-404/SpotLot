import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CreateLot({ navigation }){
  const [image_url, onChangePhoto] = React.useState('https://cdn4.iconfinder.com/data/icons/core-ui-outlined/32/outlined_placeholder-512.png')
  const [price, changePrice] = React.useState('');
  const [location, changeLocation] = React.useState('');
  const [max_reserve, changeMaxReserve] = React.useState('');
  const [max_spots, changeMaxSpots] = React.useState('');
  const [description, changeDescription] = React.useState('');

  function saveToDB(){

  }

  handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if(result.uri){
      onChangePhoto(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", margin: 16, left: -60, top: -10 }}
        onPress={() => navigation.goBack()}
        >
        <FontAwesome5 name="arrow-left" size={24} color='#3fb984' />
      </TouchableOpacity>
      <Text style={styles.header}>Create a lot</Text>
      <View style={{top: -50}}>
        <Image source={{ uri: image_url }} style={{ resizeMode: 'contain', width: 150, height: 150 }}/>
        <Button
          title="Choose Photo"
          onPress={handleChoosePhoto}
          color={'#726D9B'}
        />
      </View>
      <View style={{ top: -60}}>
        <View style={{top: 5}}>
          <Text style={styles.inputHeader}>Location</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeLocation(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 10}}>
          <Text style={styles.inputHeader}>Flat rate</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changePrice(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 15}}>
          <Text style={styles.inputHeader}>Total available parking spaces</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeMaxSpots(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 20}}>
          <Text style={styles.inputHeader}>Maximum hours reserved</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeMaxReserve(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 25}}>
          <Text style={styles.inputHeader}>Extra info</Text>
          <TextInput
            style={styles.info}
            onChangeText={text => changeDescription(text)}
            multiline={true}
            numberOfLines={5}
          >
          </TextInput>
        </View>
        <View style={{ top: 60 }}>
          <Button color="#726D9B" title="Complete" onPress={() => saveToDB()} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 55,
  },
  header: {
    fontSize: 25,
    color: '#222222',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: -55
  },
  inputHeader: {
    color: '#222222',
    bottom: 5,
    top: 10
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 300,
    top: 10,
    backgroundColor: 'white',
  },
  info : {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    top: 10
  },
})