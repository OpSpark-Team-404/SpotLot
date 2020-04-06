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
        <Button color="#726D9B" title="Stripe signup" onPress={this._handlePressAsync} />
        {this.state.result ? <Text>Thank you for signing up with Stripe, you will now be able to rent out a lot.</Text> : null}
      </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl); 
    let result = await AuthSession.startAsync({
        authUrl:
          `https://connect.stripe.com/express/oauth/authorize?client_id=ca_GyyGQiG3LQwR35E2daAY3GDEA8Y5Sgn1`
      }
    );
    this.setState({ result: result.params.code });
  };
}