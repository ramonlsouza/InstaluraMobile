import {Navigation} from 'react-native-navigation';
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

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            options: {
              topBar: {
                visible: false
              }
            },
            children: [
              {
                component: {
                  name: 'Feed',
                }
              },
              {
                component: {
                  name: 'Login',
                }
              }
            ]
          }
        }
      });

  });