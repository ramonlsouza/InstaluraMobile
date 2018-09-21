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
  //faz isso no inicio
  constructor() {
    super();

    this.state = {
      fotos: []
    }
  }

  //se constructor deu certo, atualiza dados aqui
  componentDidMount() {
    //busca fotos na api remota, faz parse do json e atualiza estado da variavel fotos
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}))
  }

  render() {
    return (
      <FlatList style={styles.container}
        keyExtractor={item => item.id.toString()}
        data={this.state.fotos}
        renderItem={ ({item}) =>
          <Post foto={item}/>
        }
      />
    );
  }
}
const margem = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margem
  },
});