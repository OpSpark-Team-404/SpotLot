import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";

export default function MyLot({ navigation, user }) {
  const [userLots, onChangeUserLots] = React.useState([]);

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
      <View>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-start", top: 20 }}
          onPress={() => navigation.openDrawer()}
        >
          <FontAwesome5 name="bars" size={30} color="#3fb984" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-end", top: -40 }}
          onPress={() => navigation.navigate("CreateLot", {
            user: user
          })}
        >
          <FontAwesome5 name="plus-circle" size={30} color="#3fb984" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ alignItems: "flex-start" }}>
          <Text>Lot Name</Text>
          <Text>Location?</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text>$20/hr</Text>
          <Text>Distance Miles</Text>
        </View>
      </View>
      {userLots ? userLots.map((lot) => (
          <View>
            <FontAwesome5 name="car" size={36} color='#3FB984' />
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 20}}>{lot.price}</Text>
            </View>
          </View>
        )) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
})