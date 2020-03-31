import React from 'react';
import LotPreview from './LotPreview';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ListView({navigation}){
  const [allLots, onChangeAllLots] = React.useState([]);

  React.useEffect(() => {
    grabAllLots();
  });

  const grabAllLots = () => {
    axios.get('http://10.0.2.2:8080/lot/allLots')
      .then(res => {
        onChangeAllLots(res.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <View>
      <View style={{backgroundColor: "#726D9B", height: 80}}>
        <TouchableOpacity
          style={{ margin: 16, alignSelf: "flex-start", top: 15 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={30} color='#E5EBEA' />
        </TouchableOpacity>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <TouchableOpacity
          style={{ alignSelf: "flex-end", margin: 16, top: -98 }}
          // onPress={}
        >
          <FontAwesome5 name="sort" size={35} color='#E5EBEA' />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal:20}}>
        <ScrollView style={{top: 10}}>
          {allLots ? allLots.map((lot) => (
            <LotPreview lot={lot} key={lot.id} navigation={navigation} />
          )) : null}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nameText:{
    fontSize: 30,
    marginLeft: 15,
    fontWeight: 'bold'
  },
  image:{
    marginTop: 15,
    height: 200,
    width: '100%'
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  }
});