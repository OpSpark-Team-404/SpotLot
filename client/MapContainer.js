import React from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps'
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import { StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import { mapStyle } from './mapStyle';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

class MapContainter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchButtonClicked: false,
      lat: 29.9511,
      lng: -90.031533,
      markers: [],
      reservedLat: 32.78306,
      reservedLng: -96.80667,
      hasReserved: true,
      text: 'Search for spots...'
    };
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
    this.changeMapCords = this.changeMapCords.bind(this);
    this.getLots = this.getLots.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  componentDidMount() {
    this.getLots();
  }

  changeMapCords(lat, lng){
    this.setState({
      lat: lat,
      lng: lng
    })
  }

  onSearchButtonClick() {
    this.setState({
      isSearchButtonClicked: !this.state.isSearchButtonClicked,
    })
  }

  onBlurInput() {
    this.setState({
      isSearchButtonClicked: false,
    })
  }

  changeText(text) {
    this.setState({
      text
    })
  }

  getLots(){
    axios.get('http://10.0.2.2:8080/lot/allLots')
      .then((res) => {
        this.setState({
          markers: res.data,
        })
      })
      .catch((res) => {
        console.log('error getting markers');
      });
  }

  render() {
    const { markers, lat, lng, reservedLat, reservedLng, hasReserved, text } = this.state

    return (
      <View style={styles.container}>
        <MapView
          showsCompass={false}
          customMapStyle={mapStyle} 
          style={styles.map}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: .5,
            longitudeDelta: .5,
          }}
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}

              image={'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-car&size=120&background=3FB984&color=222222&hoffset=0&voffset=-1'}
              onPress={()=>{
                this.props.navigation.navigate('LotInfo', {
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
          onPress={() => this.props.navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={30} color='#3fb984' />
        </TouchableOpacity>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <TouchableOpacity
          style={{ alignSelf: "flex-end", margin: 16, top: -90 }}
          onPress={() => this.props.navigation.navigate('ListView')}
        >
          <FontAwesome5 name="list-ul" size={30} color='#3fb984' />
        </TouchableOpacity>
            <Text style={styles.textInput} onPress={this.onSearchButtonClick}> <FontAwesome5 name="search" size={25} color='#3FB984'/>  {text}</Text>
        {this.state.isSearchButtonClicked ?
          <SearchInput changeCords={this.changeMapCords} onBlurFunc={this.onBlurInput} changeText={this.changeText}/>
          :
          null
        }
        {hasReserved ?
          <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                top: 375,
                right: 10
              }}
              onPress={() => this.changeMapCords(reservedLat, reservedLng)}
            >
              <FontAwesome5 name="map-marked" size={30} color="#3FB984" />
            </TouchableOpacity>
          :
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              top: 375,
              right: 10
            }}
          >
            <FontAwesome5 name="map-marked" size={30} color="#394648" />
          </TouchableOpacity>
        }
      </View>
    );
  }
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
    width: 411,
    height: 45,
    top: 460,
    backgroundColor: 'white',
    textAlignVertical: 'center',
    fontSize: 20
  },
});

export default MapContainter;