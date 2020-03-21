import React, { Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { googlKey } from '../supersecret';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };

    this.convertToCords = this.convertToCords.bind(this);
  }

  convertToCords(){
    const { changeCords } = this.props;
    Geocoder.init(googlKey);
    Geocoder.from(this.state.text)
        .then(json => {
            let location = json.results[0].geometry.location;
            changeCords(location.lat, location.lng);
        })
        .catch(error => console.log(error));
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      scrollView: {
        paddingHorizontal: 20,
      },
      input: {
        borderBottomWidth: 2,
        borderColor: '#dbdbdb',
        padding: 10,
        color: 'white',
        fontSize: 25,
        borderBottomWidth: 0,
      },
    });
    const { onBlurFunc } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}>
        <ScrollView style={styles.scrollView}>
        </ScrollView>
        <TextInput   onSubmitEditing={this.convertToCords} onChangeText={(text) => this.setState({text})} spellCheck={false} autoCorrect={false} autoFocus={true} style={styles.input} placeholder="Tap here" onBlur={()=>{onBlurFunc()}}/>
      </KeyboardAvoidingView>
    );
  }
}