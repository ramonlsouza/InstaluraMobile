import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Dimensions,
  FlatList,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import Post from './Post';
import HeaderUsuario from './HeaderUsuario';

import InstaluraFetchService from '../services/InstaluraFetchService';
import Notificacao from '../api/Notificacao';
 
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
    this.load();
  }

  //quando voltar pagina de perfil para feed, ativa esse evento
  componentDidAppear() {
    this.load();
  }

  load(){
    let uri = "/fotos";

    if(this.props.usuario)
      uri = '/public/fotos/' + this.props.usuario;

    InstaluraFetchService.get(uri)
    .then(json => this.setState({fotos: json}))
  }


  like(idFoto) {
    const listaOriginal = this.state.fotos;
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
      .catch(e => {
        this.setState({fotos: listaOriginal});
        Notificacao.exibe('Ops...','Algo deu errado!')
      });
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
    .catch(e => Notificacao.exibe('Ops...','Não foi possível adicionar comentário!'))
  }

  verPerfilUsuario(idFoto){
    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    Navigation.push(this.props.componentId, {
      component: {
        name: 'PerfilUsuario',
        options: {
          topBar:{
            title: {
              text: foto.loginUsuario
            }
          }
        },
        passProps: {
          usuario: foto.loginUsuario,
          fotoDePerfil: foto.urlPerfil,
        }
      }
    });    
  }

  exibeHeader(){
    if(this.props.usuario){
      //passando todas as propriedades
      return <HeaderUsuario {...this.props} posts={this.state.fotos.length}/>
    }
  }

  render() {
    return (
      <ScrollView>
        {this.exibeHeader()}
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={this.state.fotos}
          renderItem={ ({item}) =>
            <Post foto={item}
              likeCallback={this.like.bind(this)}
              comentarioCallback={this.adicionaComentario.bind(this)}
              verPerfilCallback={this.verPerfilUsuario.bind(this)}
            />
          }
        />
      </ScrollView>
    );
  }
}
