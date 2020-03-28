import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { googlKey } from '../supersecret';
import axios from 'axios';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function CreateLot({ navigation, route }){
  const [owner_id, changeUserId] = React.useState('');
  const [price, changePrice] = React.useState('');
  const [address, changeAddress] = React.useState('');
  const [lat, changeLat] = React.useState('');
  const [long, changeLong] = React.useState('');
  const [lot_close, changeLotClose] = React.useState('');
  const [lot_closeDisplay, changeLotCloseDisplay] = React.useState('');
  const [max_spots, changeMaxSpots] = React.useState('');
  const [description, changeDescription] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [lotDisplay, changeLotDisplay] = React.useState(false);
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/daauxjhcv/upload';

  React.useEffect(() => {
    const id = route.params.user.id;
    changeUserId(id);
  });

  const saveToDB = async () => {
    convertToCords();

    const image_url = photo;
    const longitude = long;
    const latitude = lat;
    const is_open = true;
    const max_reserve = 0;
    const current_spots = max_spots;

    axios.post('http://10.0.2.2:8080/lot/addLot', { owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('error', e);
      });

    navigation.goBack();
  }

  const convertToCords = () => {
    Geocoder.init(googlKey);
    Geocoder.from(address)
        .then(json => {
            let location = json.results[0].geometry.location;
            changeLat(location.lat);
            changeLong(location.lng);
        })
        .catch(error => console.log(error));
  }

  const cloud = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });
  
      if (pickerResult.cancelled === true) {
        return;
      }
  
      let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;
  
      let data = {
        "file": base64Img,
        "upload_preset": "ml_default",
      }
  
      fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
        let data = await r.json()
        
        setPhoto(data.url);

      }).catch(err => console.log(err))
  }

  const lotDisplayOn = () => {
    changeLotDisplay(true);
  }

  const lotDisplayOff = () => {
    changeLotDisplay(false);
  }

  const handleTime = time => {
    lotDisplayOff();
    changeLotClose(time);
    const closingTime = moment(time).format('LLL')
    changeLotCloseDisplay(closingTime);
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
        {photo ?
          <Image source={{ uri: photo }} style={{ width: 200, height: 150 }} />
        :
          <Image source={require('../images/ThumbnailImage.png')} style={{ resizeMode: 'contain', width: 200, height: 150, borderWidth: 2, borderColor: '#3fb984', bottom: 5 }}/>
        }
        <Button
          title="Choose Photo"
          onPress={cloud}
          color={'#726D9B'}
        />
      </View>
      <View style={{ top: -60}}>
        <View style={{top: 5, alignSelf: 'center'}}>
          {lot_closeDisplay ? <Text style={styles.lotClose}>{lot_closeDisplay}</Text> : <Text style={styles.lotCloseDefault}>January 1, 2020 12:00 PM</Text>}
          <View style={{width: 200, alignSelf: 'center', top: 20}}>
            <Button title="Lot close time" onPress={lotDisplayOn} color={'#726D9B'}/>
          </View>
          <DateTimePickerModal
            isVisible={lotDisplay}
            mode="time"
            is24Hour={false}
            onConfirm={handleTime}
            onCancel={lotDisplayOff}
          />
        </View>
        <View style={{top: 10}}>
          <Text style={styles.inputHeader}>Price</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changePrice(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 15}}>
          <Text style={styles.inputHeader}>Number of parking spaces</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeMaxSpots(text)}
          >
          </TextInput>
        </View>
        <View style={{top: 20}}>
          <Text style={styles.inputHeader}>Address</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => changeAddress(text)}
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
  lotClose : {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 200,
    top: 10,
    backgroundColor: 'white',
    height: 35,
    textAlignVertical: 'center',
    textAlign: 'center',
    top: 12
  },
  info : {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    top: 10
  },
  lotCloseDefault : {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 200,
    top: 10,
    backgroundColor: 'white',
    height: 35,
    textAlignVertical: 'center',
    textAlign: 'center',
    top: 12,
    color: '#E5EBEA'
  },
})