import {
    AsyncStorage
  } from 'react-native';
  
export default class InstaluraFetchService{
    static get(recurso){
        const uri = 'https://instalura-api.herokuapp.com/api' + recurso;

        return AsyncStorage.getItem('token')
        .then(token => {
          return {
            headers: new Headers({
              "X-AUTH-TOKEN": token
            })
          }
        })
        //busca fotos na api remota, faz parse do json e atualiza estado da variavel fotos
        .then(requestInfo => fetch(uri, requestInfo))
        .then(resposta => resposta.json())
    
    }
}