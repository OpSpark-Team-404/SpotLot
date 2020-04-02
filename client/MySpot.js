import React from 'react';
import LotPreview from './LotPreview';
import { Text, Image, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

export default function MySpot({navigation, user}){
  const [userSpots, onChangeUserSpots] = React.useState([]);
  const [currentSpot, onChangeCurrentSpot] = React.useState(0);

  React.useEffect(() => {
    onChangeUserSpots([]);
    if(user.spot_open === 0){
      onChangeCurrentSpot(0);
    } else if(user.spot_open !== 0){
      grabSingleSpot();
    }
    grabCurrentUserSpots()
  },[user.spot_open]);

  const grabCurrentUserSpots = () => {
    onChangeUserSpots([]);
    axios.get(`http://10.0.2.2:8080/user/allSpots/${user.id}`)
      .then(async res => {
        let data = await res.data;
        for(let i = 0; i < data.length; i++){
            axios.get(`http://10.0.2.2:8080/lot/selectLot/${data[i].lot_id}`)
              .then(async res => {
                let spot = await res.data
                let newArr = [...userSpots, spot];
                newArr[newArr.length] = spot;
                onChangeUserSpots(newArr);
              })
              .catch(error => {
                console.log("error", error);
              });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const grabSingleSpot = () => {
    axios.get(`http://10.0.2.2:8080/lot/selectLot/${user.spot_open}`)
      .then(async res => {
        let data = await res.data;
        onChangeCurrentSpot(data);
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
      <ScrollView>
        <View style={{padding: 55}}>
          <View style={{marginBottom: -20, top: 10}}>
            <Text style={styles.header}>My Spots</Text>
          </View>
          <Text style={styles.subHeader}>Current Spot</Text>
          {currentSpot !== 0 ?
            <View style={{ backgroundColor: "#726D9B", width: 310, height: 80, borderRadius: 5 }}>
              <LotPreview lot={currentSpot} key={currentSpot.id} navigation={navigation} color={'#E5EBEA'}/>
            </View>
          :
            <Text style={{color: '#394648'}}>(No current spot reserved)</Text>
          } 
          <View style={{top: 30}}>
            <Text style={styles.subHeader}>Spot History</Text>
            {userSpots.length > 0 ?
              userSpots
              .slice(0).reverse().map((lot) => {if(lot.id !== currentSpot.id) return(
                  <View key={lot.id}>
                    <LotPreview lot={lot} navigation={navigation}/>
                    <View style={{borderBottomWidth: 2, borderBottomColor: '#A9B4C2'}} />
                  </View>
              )})
              .filter((value, index, self) => self.indexOf(value) === index) 
              : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EBEA',
  },
  header: {
    fontSize: 25,
    color: '#394648',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: -55,
  },
  subHeader: {
    fontSize: 20,
    color: '#394648',
    fontWeight: 'bold',
    bottom: 5
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    top: -40
  }
})