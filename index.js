import {Navigation} from 'react-native-navigation';
import {AsyncStorage} from 'react-native';
import Feed from './src/components/Feed';
import Login from './src/screens/Login';


  /*
  Navigation.startSingleScreenApp({
    screen:{
      screen: 'Login',
      title: 'Login'
    }
  });
*/
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);
Navigation.registerComponent('PerfilUsuario', () => Feed);

AsyncStorage.getItem('token')
  .then(token => {
    if(token){
      return {
        //mandar direto pro feed
            component: {
              name: 'Feed',
              options: {
                topBar:{
                  title: {
                    text: 'Instalura'
                  }
                }
              }
            }
      };
    }

    return {
          component: {
            name: 'Login',
            options: {
              topBar: {
                visible: false,
              }
            },
          }
    }
  })
  .then(children => {
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
          root: {
            stack: {
              children: {
                children
              }
            }
          }
        });
    });
  })
