import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function lotPreview({lot, navigation}){
  const [carColor, onChangeCarColor] = React.useState('#3FB984');

  React.useEffect(() => {
    carColorChooser();
  });

  const carColorChooser = () => {
    if((lot.current_spots / lot.max_spots) <= 0.40){
      onChangeCarColor('red')
    } else if ((lot.current_spots / lot.max_spots) <= 0.70){
      onChangeCarColor('yellow')
    }
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LotInfo", {
        lot: lot,
      })}
    >
      <View style={{flexDirection: 'row'}}>
        <FontAwesome5 name="car-alt" size={36} color={carColor} style={{top: 10, left: 5}} />
        <View style={{padding: 10, left: 10}}>
          <Text style={{fontSize: 15}}>{lot.address}</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Open until {lot.lot_close}</Text>
          <Text style={{fontSize: 15}}>{`$${lot.price}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}