import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { googlKey } from '../supersecret';
import axios from 'axios';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function CreateLot({ navigation, userData, user, route }){
  const [price, changePrice] = React.useState('');
  const [address, changeAddress] = React.useState('');
  const [lot_close, changeLotClose] = React.useState('');
  const [max_spots, changeMaxSpots] = React.useState('');
  const [description, changeDescription] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [lotDisplay, changeLotDisplay] = React.useState(false);
  const [keyProp, changeKeyProp] = React.useState('flex-start');
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/daauxjhcv/upload';

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    changeKeyProp('flex-end');
  };

  const _keyboardDidHide = () => {
    changeKeyProp('flex-start')
  };

  const saveToDB = async () => {
    convertToCords();

    navigation.goBack();
  }

  const convertToCords = () => {
    const image_url = photo;
    const is_open = true;
    const max_reserve = 0;
    const current_spots = max_spots;
    const owner_id = user.id;

    Geocoder.init(googlKey);
    Geocoder.from(address)
        .then(async json => {
            let location = await json.results[0].geometry.location;
            const latitude = location.lat;
            const longitude = location.lng;
            axios.post('http://10.0.2.2:8080/lot/addLot', { owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description, address })
              .then((res) => {
                const lot_open = res.data.rows[0].id;
                const id = owner_id;
                axios.patch(`http://10.0.2.2:8080/user/patchUserLot/${id}`, { lot_open })
                  .then(res => {
                    console.log(res);
                    userData(user.email);
                    route.params.grabSingleLot(lot_open);
                  })
                  .catch(error => {
                    console.log("error", error);
                  });
              })
              .catch((e) => {
                console.log('error', e);
              });
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
    const closingTime = moment(time).format('LLL')
    changeLotClose(closingTime);
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.inner, { justifyContent: keyProp}]}>
          <View style={{backgroundColor: "#726D9B", height: 80}}>
            <TouchableOpacity
              style={{ margin: 16, alignSelf: "flex-start", top: 15 }}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={30} color='#E5EBEA' />
            </TouchableOpacity>
            <Image source={require('../images/logo.png')} style={styles.logo} />
          </View>
          <View style={{marginHorizontal: 25 }}>
            <Text style={styles.header}>Create a lot</Text>
            <View style={{alignSelf: 'center', top: 8}}>
              {photo ?
                <Image source={{ uri: photo }} style={{ width: 200, height: 150 }} />
              :
                <Image source={require('../images/ThumbnailImage.png')} style={{ resizeMode: 'contain', width: 200, height: 150, borderWidth: 2, borderColor: '#3fb984', bottom: 5 }}/>
              }
              <View style={{alignSelf: 'center'}}>
                <TouchableOpacity
                  onPress={cloud}
                >
                  <View style={{flexDirection: 'row'}}>
                    <FontAwesome5 name="upload" size={20} color="#726D9B" />
                    <View style={{alignSelf: 'flex-end', left: 10}}>
                      <Text style={{fontWeight: 'bold'}}>Upload a photo</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.inputHeader}>Lot close time</Text>
              {lot_close ? <Text style={styles.textInputTime}>{lot_close}</Text> : <Text onPress={lotDisplayOn} style={styles.textInputTime}></Text>}
            </View>
            <DateTimePickerModal
              isVisible={lotDisplay}
              mode="time"
              is24Hour={false}
              onConfirm={handleTime}
              onCancel={lotDisplayOff}
            />
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.inputHeader}>Price</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changePrice(text)}
              >
              </TextInput>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.inputHeader}>Number of parking spaces</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changeMaxSpots(text)}
              >
              </TextInput>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.inputHeader}>Address</Text>
              <TextInput
                paddingLeft={5}
                style={styles.textInput}
                onChangeText={text => changeAddress(text)}
              >
              </TextInput>
            </View>
            <View style={{alignSelf: 'center', width: 300}}>
              <Text style={styles.inputHeader}>Extra info</Text>
              <TextInput
                paddingLeft={5}
                style={styles.info}
                onChangeText={text => changeDescription(text)}
                multiline={true}
                numberOfLines={5}
              >
              </TextInput>
            </View>
            <View style={{ top: 20, width: 300, left: 31 }}>
              <Button color="#726D9B" title="Complete" onPress={() => saveToDB()} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  inner: {
    flex: 1
  },
  header: {
    fontSize: 25,
    color: '#222222',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: 4
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
  textInputTime: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 300,
    top: 10,
    backgroundColor: 'white',
    height: 32,
    textAlignVertical: 'center',
    paddingLeft: 5
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
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  }
})