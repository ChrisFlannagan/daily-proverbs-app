/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/navigators';
import firebase from 'react-native-firebase';

AppRegistry.registerComponent('DailyProverbs', () => App );

firebase.auth().signInAnonymously()
.then((user) => {
	console.log(user.isAnonymous);
});