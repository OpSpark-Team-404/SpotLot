import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, ImageEditor } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Profile(props){
  const [editStatus, onStatusChange] = React.useState('false');
  const [description, onChangeDescription] = React.useState('My description')

  return (
    <View style={styles.container}>
      <Image style={styles.photoImage} source={{ uri: props.photoUrl }} />
      <Text style={styles.header}>{props.name}</Text>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoImage: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150,
    bottom: 10,
    top: -70
  },
  header: {
    fontSize: 25,
    color: '#E5EBEA',
    top: -60
  },
  textArea: {
    fontSize: 15,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    width: 250,
    height: 125,
    borderRadius: 5
  },
  icon: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  }
});