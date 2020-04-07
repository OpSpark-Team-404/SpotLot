import React from 'react';
import { SafeAreaView, Text, Image, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthSession } from 'expo';
import axios from 'axios';

export default function SignUpStripe({ navigation, user }){
  const [stripeResult, changeStripeResult] = React.useState(null);

  function complete(){
    console.log('BOOYAH', user.id, stripeResult);

    if(stripeResult){
      axios.post(`http://10.0.2.2:8080/stripe/createConnect/${user.id}/${stripeResult}`)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log('error', e);
        });
    }

    const pushAction = StackActions.push('Login')
    navigation.dispatch(pushAction);
    navigation.navigate('Map')
  }

  const handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl); 
    let result = await AuthSession.startAsync({
        authUrl:
          `https://connect.stripe.com/express/oauth/authorize?client_id=ca_GyyGQiG3LQwR35E2daAY3GDEA8Y5Sgn1`
      }
    );
    changeStripeResult(result.params.code);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: "#726D9B", height: 80}}>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-start", top: 15 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={30} color='#E5EBEA' />
        </TouchableOpacity>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.info}>
        <Text style={styles.header}>Sign up for SpotLot</Text>
        <Text style={styles.subtext}>
          If you plan on renting out a lot you will need to sign up with Stripe, otherwise you can skip this step and complete your sign up.
        </Text>
        <View style={{width: 315, top: -50}}>
          <Button color="#726D9B" title="Stripe signup" onPress={() => handlePressAsync()} />
        </View>
        <View style={{top: 30}}>
          {stripeResult ? <Text style={styles.subtext}>Thank you for signing up with Stripe, you will now be able to rent out a lot.</Text> : null}
        </View>
        <View style={{width: 315}}>
          <Button color="#726D9B" title="Complete signup" onPress={() => complete()} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 45,
    top: 50
  },
  header: {
    fontSize: 25,
    color: '#395C6B',
    top: -80,
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  subtext: {
    fontSize: 15,
    color: '#395C6B',
    top: -70,
    marginBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  },
})