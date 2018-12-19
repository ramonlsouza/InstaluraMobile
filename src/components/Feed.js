import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Dimensions,
  FlatList,
  AsyncStorage
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';

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
    InstaluraFetchService.get('/fotos')
    .then(json => this.setState({fotos: json}))
  }


  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    AsyncStorage.getItem('usuario')
    .then(usuarioLogado => {
      let novaLista = []

      if(!foto.likeada){
        novaLista = [
          ...foto.likers,
          {login: usuarioLogado}
        ]
      }else{
        novaLista = foto.likers.filter( liker => {
          return liker.login !== usuarioLogado
        });
      }

      return novaLista;
    })
    .then(novaLista => {
      const fotoAtualizada = {
        //TODO: pesquisar sobre isso depois (spread syntax)
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
      }
      const fotos = this.state.fotos
        .map( foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

      this.setState({fotos})
    })

    InstaluraFetchService.post('/fotos/'+idFoto+'/like')
  }


  adicionaComentario(idFoto, valorComentario, inputComentario){
    if(valorComentario === '')
      return;

    const foto = this.state.fotos.find(foto => foto.id === idFoto)
    const comentario = {texto: valorComentario};

    InstaluraFetchService.post('/fotos/'+idFoto+'/comment',comentario)
    .then(comentario => [...foto.comentarios, comentario])
    .then(novaLista => {
      const fotoAtualizada = {
        ...foto,
        comentarios: novaLista
      }
  
      const fotos = this.state.fotos
        .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
  
      this.setState({fotos})
    })
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
