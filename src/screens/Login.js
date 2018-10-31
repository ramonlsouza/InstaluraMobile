import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  TextInput,
  Button,
  View,
  Image, 
  Dimensions,
} from 'react-native';

const width = Dimensions.get('screen').width;

export default class Login extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input} placeholder="Usuário"
                        onChangeText={texto => this.setState({usuario : texto})} />
                    <TextInput style={styles.input} placeholder="Senha"
                        onChangeText={texto => this.setState({senha : texto})} />
                        
                    <Button title="Login" onPress={() => console.warn("Login")} />
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