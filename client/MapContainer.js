import React from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps'
import { StyleSheet, View} from 'react-native';
import { mapStyle } from './mapStyle';

class MapContainter extends React.Component {

  render(){
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