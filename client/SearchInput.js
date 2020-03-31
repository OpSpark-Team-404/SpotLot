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
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(text) {
    this.setState({
      text
    })

    this.props.changeText(text);
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
    const { onBlurFunc } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}>
        <ScrollView style={styles.scrollView}>
        </ScrollView>
        <TextInput onSubmitEditing={this.convertToCords} onChangeText={(text) => this.handleTextChange(text)} spellCheck={false} autoFocus={true} autoCorrect={false} style={styles.input} onBlur={()=>{onBlurFunc()}}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    left: 6,
    bottom: 25,
    fontSize: 25,
    color: 'white'
  },
});