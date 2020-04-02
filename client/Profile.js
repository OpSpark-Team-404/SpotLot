import React from 'react';
import { Text, Image, View, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Keyboard } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation, user, userData }) {
  const [name, changeName] = React.useState(user.name);
  const [image_url, changeImage] = React.useState(user.image_url);
  const [phone, changePhone] = React.useState(user.phone);
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

  const updateProfile = () => {
    const id = user.id;
    axios.patch(`http://10.0.2.2:8080/user/patchUser/${id}`, { name, image_url, phone })
      .then(res => {
        console.log(res);
        userData(user.email);
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

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <View style={styles.container}>
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
          <View style={styles.info}>
            <Text style={styles.header}>Profile Information</Text>
            <View style={{ top: -90}}>
              <View style={{alignSelf: 'center', top: 8}}>
                <Image source={{ uri: image_url }} style={styles.photoImage} />
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
              <View style={{top: 5}}>
                <Text style={styles.inputHeader}>Name</Text>
                <TextInput
                  paddingLeft={5}
                  style={styles.textInput}
                  placeholder={user.name}
                  placeholderTextColor={'#222222'}
                  onChangeText={text => changeName(text)}
                ></TextInput>
              </View>
              <View style={{top: 10}}>
                <Text style={styles.inputHeader}>Phone Number</Text>
                <TextInput
                  paddingLeft={5}
                  style={styles.textInput}
                  placeholder={user.phone}
                  placeholderTextColor={'#222222'}
                  onChangeText={text => changePhone(text)}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={{ top: -20, width: 320, alignSelf: 'center' }}>
            <Button color="#726D9B" title="Confirm profile changes" onPress={() => updateProfile()}></Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  inner: {
    flex: 1
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
  photoImage: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: '#3fb984',
    borderWidth: 3,
    borderRadius: 150,
  },
})