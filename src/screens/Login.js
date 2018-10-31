import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  TextInput,
  Button,
  View,
  Image, 
  Dimensions,
  AsyncStorage,
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component{
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

                return AsyncStorage.getItem('token');
            })
            .then(token => console.warn(token));
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
    }
});