import React, { Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet
} from 'react-native';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
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
      },
    });

    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}>
        <ScrollView style={styles.scrollView}>
        </ScrollView>
        <TextInput autoFocus={true} style={styles.input} placeholder="Tap here" />
      </KeyboardAvoidingView>
    );
  }
}