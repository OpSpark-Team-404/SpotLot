import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile({ navigation, user }){
  const [editStatus, onStatusChange] = React.useState('false');
  const [description, onChangeDescription] = React.useState('')

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", justifyContent: "flex-start", margin: 16, top: 20 }}
        onPress={() => navigation.openDrawer()}
      >
        <FontAwesome5 name="bars" size={30} color='#3fb984'/>
      </TouchableOpacity>
      <Image style={styles.photoImage} source={{ uri: user.image_url }} />
      <Text style={styles.header}>{user.name}</Text>
      {!editStatus ? (
        <View>
          <TextInput
            style={styles.textArea}
            onChangeText={text => onChangeDescription(text)}
            multiline={true}
            numberOfLines={5}
            maxLength={100}
          >
            {description}
          </TextInput>
          <View style={styles.icon}>
            <Icon
            name='check'
            color='#726D9B'
            underlayColor='#E5EBEA'
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
            color='#726D9B'
            underlayColor='#E5EBEA'
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
    backgroundColor: '#E5EBEA',
  },
  photoImage: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: '#3fb984',
    borderWidth: 3,
    borderRadius: 150,
    bottom: 10,
    top: -70,
    alignSelf: "center",
    top: 10,
  },
  header: {
    fontSize: 25,
    color: '#222222',
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
    top: 60,
    borderColor: '#3fb984',
    borderWidth: 2
  },
  icon: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    top: 60,
    marginRight: 80
  }
});