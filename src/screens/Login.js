import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  TextInput,
  Button,
  View,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

const width = Dimensions.get('screen').width;

export default class Login extends Component{
    constructor(){
     super();
     this.state = {
         usuario: '',
         senha: '',
         mensagem: ''
     }   
    }
    efetuaLogin(){
        const uri = "https://instalura-api.herokuapp.com/api/public/login";
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha,
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }
        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok)
                    return response.text()

                throw new Error("Não foi possível efetuar login.");
            })
            .then(token => {
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.usuario);

                
                Navigation.push(this.props.componentId, {
                    component: {
                      name: 'Feed',
                    }
                  });
            })
            .catch(e => this.setState({mensagem: e.message}))
    }
    logout() {
        AsyncStorage.removeItem('usuario');
        AsyncStorage.removeItem('token');
    
        this.props.navigator.resetTo({
            screen:{
                screen: 'Login',
                title: 'Login'
            }
        });
    }    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Usuário"
                        onChangeText={texto => this.setState({usuario : texto})} 
                        autoCapitalize="none"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Senha"
                        onChangeText={texto => this.setState({senha : texto})} 
                        secureTextEntry={true}
                    />
                        
                    <Button title="Login" onPress={this.efetuaLogin.bind(this)} />
                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //ocupar todo o espaço da tela
        alignItems: 'center',//alinhar horizontal
        justifyContent: 'center' //alinhar vertical
    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    titulo: { 
        fontWeight: 'bold',
        fontSize: 26,
    },
    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    }
});