import React from 'react';
import { Text, Image, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';

export default function EditLot({ navigation, user, route }) {
  const [image_url, changeImage] = React.useState('');
  const [lot_close, changeClose] = React.useState('');
  const [max_spots, changeMax] = React.useState('');
  const [description, changeDescription] = React.useState('');
  const [spotsPlaceholder, changeSpotsPlaceholder] = React.useState('');
  const [descriptionPlaceholder, changeDescriptionPlaceholder] = React.useState('');
  const [lotDisplay, changeLotDisplay] = React.useState(false);
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/daauxjhcv/upload';

  React.useEffect(() => {
    changeImage(route.params.lot.image_url);
    changeClose(route.params.lot.lot_close);
    changeMax(route.params.lot.max_spots);
    changeSpotsPlaceholder(route.params.lot.max_spots.toString());
    changeDescription(route.params.lot.description);
    changeDescriptionPlaceholder(route.params.lot.description);
  }, []);

  const updateLot = () => {
    axios.patch(`http://10.0.2.2:8080/lot/patchLot/${route.params.lot.id}`, { image_url, lot_close, max_spots, description })
      .then(res => {
        console.log(res);
        route.params.grabSingleLot(route.params.lot.id);
        navigation.goBack();
      })
      .catch(error => {
        console.log("error", error);
      });
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
      
      changeImage(data.url);

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
    changeClose(closingTime);
  }

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
      <View style={styles.info}>
        <Text style={styles.header}>Edit current lot</Text>
        <View style={{ top: -90}}>
          <View style={{alignSelf: 'center'}}>
            <Image source={{ uri: image_url }} style={styles.photoImage} />
            <View style={{alignSelf: 'center', top: 10}}>
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
          <View>
            <Text style={styles.inputHeader}>Lot close time</Text>
            <Text onPress={lotDisplayOn} style={[styles.textInput, {height: 32, paddingLeft: 5, paddingTop: 5}]}>{lot_close}</Text>
            <DateTimePickerModal
              isVisible={lotDisplay}
              mode="time"
              is24Hour={false}
              onConfirm={handleTime}
              onCancel={lotDisplayOff}
            />
          </View>
          <View style={{top: 10}}>
            <Text style={styles.inputHeader}>Number of spots</Text>
            <TextInput
              paddingLeft={5}
              style={styles.textInput}
              placeholder={spotsPlaceholder}
              placeholderTextColor={'#222222'}
              onChangeText={text => changeMax(Number(text))}
            ></TextInput>
          </View>
          <View style={{top: 15}}>
            <Text style={styles.inputHeader}>Lot description</Text>
            <TextInput
              paddingLeft={5}
              style={[styles.textInput, {textAlignVertical: 'top'}]}
              multiline={true}
              numberOfLines={5}
              placeholder={descriptionPlaceholder}
              placeholderTextColor={'#222222'}
              onChangeText={text => changeDescription(text)}
            >
            </TextInput>
          </View>
        </View>
      </View>
      <View style={{ top: -20, width: 320, alignSelf: 'center' }}>
        <Button color="#726D9B" title="Confirm vehicle changes" onPress={() => updateLot()}></Button>
      </View>
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
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    width: 325,
    top: 12,
    backgroundColor: 'white',
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
  photoImage: {
    resizeMode: 'contain',
    width: 200,
    height: 150,
    borderWidth: 2,
    borderColor: '#3fb984',
    top: 10
  }
})