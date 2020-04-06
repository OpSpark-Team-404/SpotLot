import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';

export default class StripeButton extends React.Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View>
        <Button style = {styles.button} title="Stripe" onPress={this._handlePressAsync} />
        {this.state.result ? <Text> {JSON.stringify(this.state.result)} </Text> : null}
        </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl); 
    let result = await AuthSession.startAsync(
       {
        
        authUrl:
          `https://connect.stripe.com/express/oauth/authorize?client_id=ca_GyyGQiG3LQwR35E2daAY3GDEA8Y5Sgn1`
      }
    );
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E5EBEA',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subtext: {
      color: '#395C6B',
      fontSize: 25,
      textAlign: 'center',
      top: -85,
      fontStyle: 'italic'
    },
    text: {
      color: '#395C6B',
      fontSize: 50,
      top: -95,
      fontWeight: 'bold'
    },
    image: {
      width: 135,
      height: 135,
      resizeMode: 'contain',
      top: -80
    },
    spotlot: {
      color: '#3FB984',
      fontWeight: 'bold',
    },
    button: {
      width: 300,
      padding: 10,
    },
  });