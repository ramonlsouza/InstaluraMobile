/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  Image, 
  Dimensions,
  FlatList
} from 'react-native';

const width = Dimensions.get('screen').width;

type Props = {};
export default class App extends Component<Props> {
  render() {
    const fotos = [
      {id:1, usuario: 'trivialidades'},
      {id:2, usuario: 'trivialidades'},
      {id:3, usuario: 'trivialidades'}
    ]
    return (
      <FlatList style={{ marginTop: 20 }}
        keyExtractor={item => item.id.toString()}
        data={fotos}
        renderItem={ ({item}) =>
          <View>
            <View style={{margin: 10,flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('./resources/img/ramon.jpg')} 
                style={{marginRight: 10, borderRadius: 20, width: 40, height: 40}}/>
              <Text>{item.usuario}</Text>
            </View>
            <Image source={require('./resources/img/ramon.jpg')} 
              style={{width: width, height: width}}/>
          </View>
        }
      />
    );
  }
}
