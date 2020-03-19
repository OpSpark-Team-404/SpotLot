import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile({ navigation }){
  const [editStatus, onStatusChange] = React.useState('false');
  const [description, onChangeDescription] = React.useState('My description')

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", justifyContent: "flex-start", margin: 16, top: 20 }}
        onPress={() => navigation.openDrawer()}
      >
        <FontAwesome5 name="bars" size={30} color="#161624" />
      </TouchableOpacity>
      <Image style={styles.photoImage} source={{ uri: 'https://pngimg.com/uploads/face/face_PNG5645.png' }} />
      <Text style={styles.header}>Fresh Prince</Text>
      {!editStatus ? (
        <View>
          <TextInput
            style={styles.textArea}
            onChangeText={text => onChangeDescription(text)}
            multiline={true}
            numberOfLines={5}
          >
            {description}
          </TextInput>
          <View style={styles.icon}>
            <Icon
            name='check'
            underlayColor='#3fb984'
            onPress={() => onStatusChange(!editStatus)}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={styles.textArea}
            multiline={true}
            numberOfLines={5}
          >
            {description}
          </Text>
          <View style={styles.icon}>
            <Icon
            name='edit'
            underlayColor='#3fb984'
            onPress={() => onStatusChange(!editStatus)}
            />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3fb984',
  },
  photoImage: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150,
    bottom: 10,
    top: -70,
    alignSelf: "center",
    top: 10
  },
  header: {
    fontSize: 25,
    color: '#E5EBEA',
    top: -60,
    alignSelf: "center",
    top: 20
  },
  textArea: {
    fontSize: 15,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    width: 250,
    height: 125,
    borderRadius: 5,
    alignSelf: "center",
    top: 60
  },
  icon: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    top: 60,
    marginRight: 80
  }
});