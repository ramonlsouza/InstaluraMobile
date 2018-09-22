import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Image, 
  TouchableOpacity,
} from 'react-native';

export default class Likes extends Component{
    exibeLikes(likers){
        if(likers <= 0)
            return;
        
        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );
    }

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : 
        require('../../resources/img/s2.png')
    }
       
    render(){
        const { foto, likeCallback } = this.props;
        return(
            <View>
            <TouchableOpacity onPress={likeCallback}>
            <Image style={styles.botaoDeLike} 
                source={this.carregaIcone(foto.likeada)} 
            />
            </TouchableOpacity>

            {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    botaoDeLike: {
        width: 40,
        height: 40,
        marginBottom: 10
    },
    likes: {
        fontWeight: 'bold'
    },
        
});