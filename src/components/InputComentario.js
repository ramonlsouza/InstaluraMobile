import React, {Component} from 'react';
import {
  View,
  Platform,
  Image, 
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default class InputComentario extends Component{
    constructor(){
        super();
        this.state = {
            valorComentario: ''
        }
    }

    render(){
        return(
            <View style={styles.container}>
            <TextInput style={styles.input} 
              placeholder="Adicione um comentário..."
              ref={input => this.inputComentario = input}
              onChangeText={texto => this.setState({valorComentario: texto})}
              underlineColorAndroid="transparent"
            />
            
            <TouchableOpacity onPress={() => {
                this.props.comentarioCallback(this.props.idFoto, this.state.valorComentario, this.inputComentario);
                this.setState({valorComentario: ''})
                //bug com clear nessa versao do react native, hacking-fix
                if (Platform.OS === 'ios') this.inputComentario.setNativeProps({ text: ' ' });
                setTimeout(() => { this.inputComentario.setNativeProps({ text: '' }) }, 5)

            }}>
              <Image style={styles.icone} 
                source={require('../../resources/img/send.png')}
              />
            </TouchableOpacity>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40
      },
      icone: {
        width: 30,
        height: 30
      },
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      }    
});