import React from 'react';
import MapView from 'react-native-maps'
import { StyleSheet, View} from 'react-native';

class MapContainer extends React.Component {

  render(){
    const Marker = MapView.Marker;
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.map}
          region={{
            latitude: 29.9511,
            longitude: -90.071533,
            latitudeDelta: .5,
            longitudeDelta: .5,
          }}
        >
          <Marker 
            coordinate={{
              latitude: 29.9511,
              longitude: -90.071533,
            }}
            title={"MY FIRST MARKER"}
            description={"my marker descript"}
          />
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

export default MapContainer;