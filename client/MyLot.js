import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";

export default function MyLot({ navigation, user }) {
  const [userLots, onChangeUserLots] = React.useState([]);
  const [currentLot, onChangeCurrentLot] = React.useState(false);

  React.useEffect(() => {
    grabCurrentUserLots(user.id)
  });

  const grabCurrentUserLots = (id) => {
    axios.get(`http://10.0.2.2:8080/user/userLots/${id}`)
      .then(async res => {
        let data = await res.data;
        onChangeUserLots(data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: "#726D9B", height: 80}}>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-start", top: 15 }}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={30} color='#E5EBEA' />
        </TouchableOpacity>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </View>
      <View style={{padding: 55}}>
        <Text style={styles.header}>My Lots</Text>
        {currentLot ?
          <View>
            <Text style={styles.subHeader}>Current Lot</Text>
            <View style={{ backgroundColor: "#726D9B", width: 300, height: 80, borderRadius: 5 }}>
              <View style={{flexDirection: 'row', left: 25, top: 5}}>
                <FontAwesome5 name="car" size={36} color='#3FB984' />
                <Text style={{alignSelf: 'center', padding: 10, color: '#E5EBEA'}}>Address</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{left: 25, bottom: -10, color: '#E5EBEA'}}>Price</Text>
                <Text style={{left: 160, bottom: -10, color: '#E5EBEA'}}>Closing Time</Text>
              </View>
            </View>  
          </View>
        :
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateLot", {
              user: user
            })}
          >
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="plus-circle" size={30} color="#726D9B" />
              <View style={{justifyContent: 'center'}}>
                <Text style={{color: "#726D9B", fontSize: 18, left: 15}}>Create a lot</Text>
              </View>
            </View>
          </TouchableOpacity>
        }
        <View style={{top: 30}}>
          <Text style={styles.subHeader}>Lot History</Text>
          {userLots.map((lot) => (
            <View style={{flexDirection: 'row', padding: 10}}>
              <View>
                <Text>{lot.address}</Text>
                <Text>{`$${lot.price}`}</Text>
              </View>
              <View style={{justifyContent: 'flex-end', left: 90}}>
                <Text>{lot.lot_close}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  },
  header: {
    fontSize: 25,
    color: '#394648',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: -35
  },
  subHeader: {
    fontSize: 20,
    color: '#394648',
    fontWeight: 'bold',
    bottom: 5
  },
})
© 2020 GitHub, Inc.