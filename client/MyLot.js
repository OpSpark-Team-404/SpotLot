import React from 'react';
import LotPreview from './LotPreview';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";

export default function MyLot({ navigation, user, userData }) {
  const [userLots, onChangeUserLots] = React.useState([]);
  const [singleLot, onChangeSingleLot] = React.useState(0);

  React.useEffect(() => {
    grabCurrentUserLots(user.id)
    if(user.lot_open > 0 && user.lot_open !== null){
      grabSingleLot(user.lot_open);
    }
  },[]);

  const grabCurrentUserLots = (id) => {
    axios.get(`http://10.0.2.2:8080/user/userLots/${id}`)
      .then(async res => {
        let data = await res.data;
        let lots = data.filter(lot => lot.id !== user.lot_open)
        onChangeUserLots(lots);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const grabSingleLot = (id) => {
    axios.get(`http://10.0.2.2:8080/lot/selectLot/${id}`)
      .then(async res => {
        let data = await res.data;
        onChangeSingleLot(data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const handleLotClose = () => {
    const lot_open = 0;
    axios.patch(`http://10.0.2.2:8080/user/patchUserLot/${user.id}`, { lot_open })
      .then(res => {
        console.log(res);
        userData(user.email);
        axios.get(`http://10.0.2.2:8080/user/userLots/${user.id}`)
          .then(async res => {
            let data = await res.data;
            onChangeUserLots(data);
          })
          .catch(error => {
            console.log("error", error);
          });
        onChangeSingleLot(0);
      })
      .catch(error => {
        console.log("error", error);
      });
  }

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
          <Text style={styles.header}>My Lots</Text>
          {singleLot !== 0 ?
            <View>
              <Text style={styles.subHeader}>Current Lot</Text>
              <View style={{ backgroundColor: "#726D9B", width: 308, height: 80, borderRadius: 5 }}>
                <LotPreview lot={singleLot} navigation={navigation} color={'#E5EBEA'}/>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 100, top: 5}}>
                  <TouchableOpacity onPress={() => navigation.navigate("EditLot")}>
                    <View style={{flexDirection: 'row'}}>
                      <FontAwesome5 name="edit" size={28} color='#3FB984' />
                      <View style={{justifyContent: 'center'}}>
                        <Text style={{color: "#726D9B", fontSize: 18, left: 10, color: '#3FB984'}}>Edit lot</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{width: 100, top: 5}}>
                  <TouchableOpacity onPress={() => handleLotClose()}>
                    <View style={{flexDirection: 'row', top: 2}}>
                      <FontAwesome5 name="times-circle" size={30} color='#3FB984' />
                      <View style={{justifyContent: 'center', left: -5}}>
                        <Text style={{color: "#726D9B", fontSize: 18, left: 10, color: '#3FB984'}}>Close lot</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          :
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateLot", {
                user: user,
                grabSingleLot: grabSingleLot
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
            <View style={{marginBottom: 10}}>
              <Text style={styles.subHeader}>Lot History</Text>
            </View>
            {userLots ? userLots.slice(0).reverse().map((lot) => (
              <View>
                <LotPreview key={lot.id} lot={lot} navigation={navigation} color={'#222222'}/>
                <View style={{borderBottomWidth: 2, borderBottomColor: '#A9B4C2'}}></View>
              </View>
            )) : null}
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