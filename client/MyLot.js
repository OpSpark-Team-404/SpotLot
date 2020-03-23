import React from 'react';
import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";

export default function MyLot({ navigation }){
  const [userLots, onCHangeUserLots] = React.useState([]);

    React.useEffect(() => {
    // const { email } = route.params;
    // axios.get(`http://10.0.2.2:8080/user/selectUser/${email}`)
    //   .then((res) => {
    //     changeUserId(res.data.id);
    //   })
      getCurrentUser('Hinesnaseer@gmail.com')
    });
  getCurrentUser = email => {
    axios.get(`http://10.0.2.2:8080/user/selectUser/${email}`)
      .then(res => {
        console.log(res.id);
        grabCurrentUserLots(res.id);
        console.log(userLots);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  grabCurrentUserLots = id => {
    axios.get(`http://10.0.2.2:8080/lots/userLots/${id}`)
      .then(res => {
        onCHangeUserLots(res);
        console.log(res);
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
          onPress={() => navigation.navigate("CreateLot")}
        >
          <FontAwesome5 name="plus-circle" size={30} color="#3fb984" />
        </TouchableOpacity>
      </View>
      <Text style={{ justifyContent: "center", alignSelf: "center" }}>
        MyLot
      </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
})
