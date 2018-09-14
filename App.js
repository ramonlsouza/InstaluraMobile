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

import Post from './src/components/Post';

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
      <FlatList style={styles.container}
        keyExtractor={item => item.id.toString()}
        data={fotos}
        renderItem={ ({item}) =>
          <Post foto={item}/>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
});