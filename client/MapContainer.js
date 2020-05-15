import React from 'react';
import MapView, { Marker } from 'react-native-maps'
import SearchInput from './SearchInput';
import { StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import { mapStyle } from './mapStyle';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

export default function MapContainer({ navigation, user }){
  const [isSearchButtonClicked, changeIsSearchButtonClicked] = React.useState(false);
  const [lat, changeLat] = React.useState(29.9511);
  const [lng, changeLng] = React.useState(-90.031533);
  const [markers, changeMarkers] = React.useState([]);
  const [reservedLat, changeReservedLat] = React.useState(32.78306);
  const [reservedLng, changeReservedLng] = React.useState(-96.80667);
  const [hasReserved, changeHasReserved] = React.useState(false);
  const [text, changeInputText] = React.useState('Search for spots...');
  const [latDelta, changeLatDelta] = React.useState(.5);
  const [lngDelta, changeLngDelta] = React.useState(.5);

  React.useEffect(() => {
    getLots();
    grabSingleSpot();
  },[user.spot_open, user.lot_open]);
  
  function grabSingleSpot(){
    if(user.spot_open > 0){
      changeHasReserved(true);
      axios.get(`http://10.0.2.2:8080/lot/selectLot/${user.spot_open}`)
        .then(async res => {
          let data = await res.data;
          const lati = Number(data.latitude);
          const longi = Number(data.longitude);
          changeReservedLat(lati);
          changeReservedLng(longi);
        })
        .catch(error => {
          console.log("error", error);
        });
    } else if(user.spot_open === 0) {
      changeHasReserved(false);
    }
  };

  function changeMapCords(lat, lng){
    changeLat(lat);
    changeLng(lng);
  }

  function changeReservedMapCords(lat, lng){
    changeLat(lat);
    changeLng(lng);
    changeLatDelta(.025);
    changeLngDelta(.025);
  }

  function onSearchButtonClick() {
    changeIsSearchButtonClicked(!isSearchButtonClicked)
  }

  function onBlurInput() {
    changeIsSearchButtonClicked(false)
  }

  function changeText(text) {
    changeInputText(text);
  }

  function getLots(){
    axios.get('http://10.0.2.2:8080/lot/allLots')
      .then((res) => {
        changeMarkers(res.data)
      })
      .catch((res) => {
        console.log('error getting markers');
      });
  }

  return (
    <View style={styles.container}>
      <MapView
        showsCompass={false}
        customMapStyle={mapStyle} 
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}

            image={'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-car&size=120&background=3FB984&color=222222&hoffset=0&voffset=-1'}
            onPress={()=>{
              navigation.navigate('LotInfo', {
                lot: marker,
              })
            }}
          >
            <MapView.Callout tooltip={true} />
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity
        style={{ alignSelf: "flex-start", margin: 16, top: 20 }}
        onPress={() => navigation.openDrawer()}
      >
        <FontAwesome5 name="bars" size={30} color='#3fb984' />
      </TouchableOpacity>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <TouchableOpacity
        style={{ alignSelf: "flex-end", margin: 16, top: -90 }}
        onPress={() => navigation.navigate('ListView')}
      >
        <FontAwesome5 name="list-ul" size={30} color='#3fb984' />
      </TouchableOpacity>
          <Text style={styles.textInput} onPress={onSearchButtonClick}>   <FontAwesome5 name="search" size={20} color='#3FB984'/>   {text}</Text>
      {isSearchButtonClicked ?
        <SearchInput changeCords={changeMapCords} onBlurFunc={onBlurInput} changeText={changeText}/>
        :
        null
      }
      {hasReserved ?
        <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              top: 345,
              right: 15
            }}
            onPress={() => changeReservedMapCords(reservedLat, reservedLng)}
          >
            <FontAwesome5 name="map-marked" size={30} color="#3FB984"/>
          </TouchableOpacity>
        :
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            justifyContent: "flex-end",
            top: 345,
            right: 15
          }}
        >
          <FontAwesome5 name="map-marked" size={30} color="#395C6B" />
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3fb984',
    color: "#3FB984",
    width: 400,
    height: 45,
    top: 430,
    backgroundColor: 'white',
    textAlignVertical: 'center',
    fontSize: 20,
    alignSelf: 'center'
  },
});