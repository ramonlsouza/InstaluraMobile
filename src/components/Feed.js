import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Dimensions,
  FlatList
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Post from './Post';

export default class Feed extends Component{
  //faz isso no inicio
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);

    this.state = {
      fotos: [],
    }
  }

  //se constructor deu certo, atualiza dados aqui
  componentDidMount() {
    //busca fotos na api remota, faz parse do json e atualiza estado da variavel fotos
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}))
  }


  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    let novaLista = []

    if(!foto.likeada){
      novaLista = [
        ...foto.likers,
        {login: 'trivialidades'}
      ]
    }else{
      novaLista = foto.likers.filter( liker => {
        return liker.login !== 'trivialidades'
      });
    }


    const fotoAtualizada = {
        //TODO: pesquisar sobre isso depois (spread syntax)
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
    }
    const fotos = this.state.fotos
      .map( foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({fotos})
  }


  adicionaComentario(idFoto, valorComentario, inputComentario){
    if(valorComentario === '')
      return;

    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    //cria uma copia local com base em objeto existente
    const novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'trivialidades',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({fotos})

  }


  render() {
    return (
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={this.state.fotos}
        renderItem={ ({item}) =>
          <Post foto={item}
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.adicionaComentario.bind(this)}
          />
        }
      />
    );
  }
}
