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
export default class Post extends Component<Props> {
  render() {
    return (
        <View>
        <View style={styles.cabecalho} >
            <Image source={require('../../resources/img/ramon.jpg')} 
            style={styles.fotoDePerfil}/>
            <Text>{this.props.foto.usuario}</Text>
        </View>
        <Image source={require('../../resources/img/ramon.jpg')} 
            style={styles.foto}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10, 
    borderRadius: 20, 
    width: 40, 
    height: 40
  },
  foto: {
    width: width, 
    height: width
  },
});