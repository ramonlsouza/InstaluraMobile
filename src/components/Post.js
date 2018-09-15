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
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';

const width = Dimensions.get('screen').width;

type Props = {};
export default class Post extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
        foto: this.props.foto
    }
  }

  carregaIcone(likeada) {
    return likeada ? require('../../resources/img/s2-checked.png') : 
    require('../../resources/img/s2.png')
  }

  like() {
    const { foto } = this.state;

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
        ...this.state.foto,
        likeada: !this.state.foto.likeada,
        likers: novaLista
    }
    this.setState({foto: fotoAtualizada})
  }

  exibeLikes(likers){
    if(likers <= 0)
      return;

    return (
        <Text style={styles.likes}>
          {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
        </Text>
    );
  }

  exibeLegenda(foto){
    if(foto.comentario === '')
      return;

    return (
      <View style={styles.comentario}>
      <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
      <Text>{foto.comentario}</Text>
    </View>

    );

  }

  render() {
    const { foto } = this.state;
    
    return (
        <View>
            <View style={styles.cabecalho} >
                <Image source={{uri: foto.urlPerfil}} 
                style={styles.fotoDePerfil}/>
                <Text>{foto.loginUsuario}</Text>
            </View>
            <Image source={{uri: foto.urlFoto}} 
                style={styles.foto}/>
            <View style={styles.rodape} >
                <TouchableOpacity onPress={this.like.bind(this)}>
                    <Image style={styles.botaoDeLike} 
                        source={this.carregaIcone(foto.likeada)} 
                    />
                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}

                {this.exibeLegenda(foto)}

                {foto.comentarios.map(comentario => 
                  <View style={styles.comentario} key={comentario.id}>
                    <Text style={styles.tituloComentario}>{comentario.login}</Text>
                    <Text>{comentario.texto}</Text>
                  </View>
                )}

                <View style={styles.novoComentario}>
                  <TextInput style={styles.input} placeholder="Adicione um comentário..."/>
                  <Image style={styles.icone} source={require('../../resources/img/send.png')}/>
                </View>
            </View>
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
  botaoDeLike: {
    width: 40,
    height: 40,
    marginBottom: 10
  },
  rodape: {
    margin: 10
  },
  likes: {
    fontWeight: 'bold'
  },
  comentario: {
    flexDirection: 'row'    
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  },
  input: {
    flex: 1,
    height: 40
  },
  icone: {
    width: 30,
    height: 30
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
});