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
        <TextInput spellCheck={false} autoCorrect={false} autoFocus={true} style={styles.input} placeholder="Tap here" onBlur={()=>{onBlurFunc()}}/>
      </KeyboardAvoidingView>
    );
  }
}