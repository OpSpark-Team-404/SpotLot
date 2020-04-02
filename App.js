import React from 'react';
import axios from 'axios';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import LoginPage from './client/LoginPage';
import SignUpProfile from './client/SignUpProfile';
import SignUpCar from './client/SignUpCar';
import Profile from './client/Profile';
import MyLot from './client/MyLot';
import CreateLot from './client/CreateLot';
import ReserveSpot from './client/ReserveSpot';
import MapContainer from './client/MapContainer';
import LotInfo from './client/LotInfo'
import MySpot from './client/MySpot';
import ListView from './client/ListView';
import Settings from './client/Settings';
import Vehicle from './client/Vehicle';
import EditLot from './client/EditLot';
import { FontAwesome5 } from '@expo/vector-icons';

const LoginStack = createStackNavigator();
const LoginStackScreen = ({ userData }) => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Login"
  >
    <LoginStack.Screen name="Login">
      {props => <LoginPage {...props} userData={userData} />}
    </LoginStack.Screen>
    <LoginStack.Screen name="SignUpProfile" component={SignUpProfile} />
    <LoginStack.Screen name="SignUpCar">
      {props => <SignUpCar {...props} userData={userData} />}
    </LoginStack.Screen>
  </LoginStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = ({user, userData}) => (
  <SettingsStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Settings"
  >
    <SettingsStack.Screen name="Settings">
      {props => <Settings {...props} user={user} />}
    </SettingsStack.Screen>
    <SettingsStack.Screen name="Profile">
      {props => <Profile {...props} user={user} userData={userData}/>}
    </SettingsStack.Screen>
    <SettingsStack.Screen name="Vehicle">
      {props => <Vehicle {...props} user={user} />}
    </SettingsStack.Screen>
  </SettingsStack.Navigator>
);

const MapContainerStack = createStackNavigator();
const MapContainerStackScreen = ({user, userData}) => (
  <MapContainerStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="MapContainer"
  >
    <MapContainerStack.Screen name="MapContainer">
      {props => <MapContainer {...props} user={user} />}
    </MapContainerStack.Screen>
    <MapContainerStack.Screen name="ListView">
      {props => <ListView {...props} user={user} />}
    </MapContainerStack.Screen>
    <MapContainerStack.Screen name="LotInfo" component={LotInfo} />
    <MapContainerStack.Screen name="Reserve">
      {props => <ReserveSpot {...props} user={user} userData={userData}/>}
    </MapContainerStack.Screen>
  </MapContainerStack.Navigator>
);

const MyLotStack = createStackNavigator();
const MyLotStackScreen = ({user, userData}) => (
  <MyLotStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="MyLot"
  >
    <MyLotStack.Screen name="MyLot">
      {props => <MyLot {...props} user={user} userData={userData}/>}
    </MyLotStack.Screen>
    <MyLotStack.Screen name="CreateLot">
      {props => <CreateLot {...props} user={user} userData={userData}/>}
    </MyLotStack.Screen>
    <MyLotStack.Screen name="EditLot">
      {props => <EditLot {...props} user={user}/>}
    </MyLotStack.Screen>
  </MyLotStack.Navigator>
);

const MySpotStack = createStackNavigator();
const MySpotStackScreen = ({user}) => (
  <MySpotStack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="MySpot"
  >
    <MySpotStack.Screen name="MySpot">
      {props => <MySpot {...props} user={user} />}
    </MySpotStack.Screen>
  </MySpotStack.Navigator>
);

function CustomDrawer(props){
  const [user, onUserChange] = React.useState({});

  React.useEffect(() => {
    if(props.user){
      onUserChange(props.user);
    }
  });

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ height: 50, width: 50, borderRadius: 150 }}
              source={{
                uri: user.image_url
              }}
            />
            <Text
              style={{ color: "#E5EBEA", alignSelf: "flex-end", fontSize: 16, left: 10 }}
            >
              {user.name}
            </Text>
          </View>
        )}
        style={{ backgroundColor: "#3fb984" }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [user, onUserChange] = React.useState({});

  function userData(email){
    axios.get(`http://10.0.2.2:8080/user/selectUser/${email}`)
      .then((res) => {
        onUserChange(res.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Logout"
        drawerContentOptions={{
          activeTintColor: "#3fb984"
        }}
        drawerContent={props => <CustomDrawer {...props} user={user} />}
      >
        <Drawer.Screen
          name="Map"
          options={{
            drawerIcon: () => (
              <FontAwesome5
                name="globe"
                color={'#726D9B'}
                size={20}
                right={-10}
              />
            )
          }}
        >
          {props => <MapContainerStackScreen {...props} user={user} userData={userData}/>}
        </Drawer.Screen>
        <Drawer.Screen
          name="MySpot"
          options={{
            drawerIcon: () => (
              <Text
              style={{
                color: '#726D9B',
                fontSize: 20,
                fontWeight: 'bold',
                left: 3,
                paddingRight: 6.5
              }}
              >
              S
              </Text>
            )
          }}
        >
          {props => <MySpotStackScreen {...props} user={user} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="MyLot"
          options={{
            drawerIcon: () => (
              <Text
              style={{
                color: '#726D9B',
                fontSize: 20,
                fontWeight: 'bold',
                left: 3,
                paddingRight: 7.5
              }}
              >
              L
              </Text>
            )
          }}
        >
          {props => <MyLotStackScreen {...props} user={user} userData={userData}/>}
        </Drawer.Screen>
        <Drawer.Screen
          name="Settings"
          options={{
            drawerIcon: () => (
              <FontAwesome5
                name="cog"
                color={'#726D9B'}
                size={20}
                right={-10}
              />
            )
          }}
        >
          {props => <SettingsStackScreen {...props} user={user} userData={userData}/>}
        </Drawer.Screen>
        <Drawer.Screen
          name="Logout"
          options={{
            gestureEnabled: false,
            drawerIcon: () => (
              <FontAwesome5
                name="sign-out-alt"
                color={'#726D9B'}
                size={20}
                right={-10}
              />
            )
          }}
        >
        {props => <LoginStackScreen {...props} userData={userData} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
