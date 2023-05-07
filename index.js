/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import Config from 'react-native-config';

Config.API_URL;
Config.GOOGLE_MAPS_API_KEY;

AppRegistry.registerComponent(appName, () => App);
