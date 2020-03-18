import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './client/LoginPage';
import SignUpProfile from './client/SignUpProfile';
import SignUpCar from './client/SignUpCar';
import Profile from './client/Profile';
import MapContainer from './client/MapContainer';

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="LoginPage"
      // screenOptions={{
      //   headerShown: false
      // }}
      >
        <Stack.Screen name="MapContainer" component={MapContainer} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpProfile" component={SignUpProfile} />
        <Stack.Screen name="SignUpCar" component={SignUpCar} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}