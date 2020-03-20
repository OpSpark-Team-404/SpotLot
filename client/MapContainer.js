import React from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps'
<<<<<<< HEAD
import { StyleSheet, View, Text} from 'react-native';
import { mapStyle } from './mapStyle';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
=======
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { mapStyle } from './mapStyle';
import { FontAwesome5 } from '@expo/vector-icons';
>>>>>>> c741ba72456bac47414bdd826b4ffe583fe26cd5

class MapContainter extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      isSearchButtonClicked: false,
    };
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
  }

  onSearchButtonClick() {
    console.log(this.state.isSearchButtonClicked);
    this.setState({
      isSearchButtonClicked: !this.state.isSearchButtonClicked,
    })
=======
>>>>>>> c741ba72456bac47414bdd826b4ffe583fe26cd5
  }

  render() {
    const markdata = [
      {
        title: 'marker1',
        description: 'description1',
        id: 1,
        latlng:{
          latitude: 29.9511,
          longitude: -90.031533,
        }
      },
      {
        title: 'marker2',
        description: 'description2',
        id: 2,
        latlng:{
          latitude: 29.9511,
          longitude: -90.171533,
        }
      },
      {
        title: 'marker3',
        description: 'description3',
        id: 3,
        latlng:{
          latitude: 29.9511,
          longitude: -90.071533,
        }
      },
    ];
    let placeHolder = <Text></Text>
    let SearchInputHolder = <SearchInput />
    return (
      <View style={styles.container}>
        <MapView
          customMapStyle={mapStyle} 
          style={styles.map}
          region={{
            latitude: 29.9511,
            longitude: -90.071533,
            latitudeDelta: .5,
            longitudeDelta: .5,
          }}
        >
          {markdata.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={'https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-car&size=120&background=3FB984&color=222222&hoffset=0&voffset=-1'}
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={{ alignSelf: "flex-start", margin: 16, top: 20 }}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={30} color="#161624" />
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