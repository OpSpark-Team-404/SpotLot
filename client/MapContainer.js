import React from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps'
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import { StyleSheet, View, TouchableOpacity, Text} from 'react-native';
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
    };
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
    this.changeMapCords = this.changeMapCords.bind(this);
    this.getLots = this.getLots.bind(this);
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
    const { markers, lat, lng } = this.state

    let placeHolder = <Text></Text>
    let SearchInputHolder = <SearchInput changeCords={this.changeMapCords} onBlurFunc={this.onBlurInput}/>
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
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              title={`${marker.id}`}
              description={marker.description}
              image={'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-car&size=120&background=3FB984&color=222222&hoffset=0&voffset=-1'}
              onPress={()=>{
                this.props.navigation.navigate('LotInfo', {
                  lot: marker,
                })
              }}
            >
            </Marker>
          ))}
        </MapView>
        <TouchableOpacity
          style={{ alignSelf: "flex-start", margin: 16, top: 20 }}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={30} color='#3fb984' />
        </TouchableOpacity>
        <SearchButton clickFunc={this.onSearchButtonClick}/>
        {this.state.isSearchButtonClicked ? SearchInputHolder : placeHolder}
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
  }
});

export default MapContainter;