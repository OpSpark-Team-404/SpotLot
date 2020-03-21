import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CreateLot({ navigation }){
  const [photo, onChangePhoto] = React.useState('')

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
        style={{ alignSelf: "flex-start", margin: 16, top: 15 }}
        onPress={() => navigation.goBack()}
        >
        <FontAwesome5 name="arrow-left" size={24} color='black' />
      </TouchableOpacity>
      {photo ?
        <Image source={{ uri: photo }} style={{ resizeMode: 'contain', width: 200, height: 200 }}/>
      : null}
      <Button
        title="Choose Photo"
        onPress={handleChoosePhoto}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
})