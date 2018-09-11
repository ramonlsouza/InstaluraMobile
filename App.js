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
  Image, 
  Dimensions
} from 'react-native';

const width = Dimensions.get('screen').width;

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <View>
          <Text>Ramón</Text>
          <Image source={require('./resources/img/ramon.jpg')} 
            style={{width: width, height: width}}
          />
        </View>
    );
  }
}
