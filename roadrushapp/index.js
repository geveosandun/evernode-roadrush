/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto'; // url object methods
import { decode } from "base-64";

import App from './App';
import { name as appName } from './app.json';

global.atob = decode; // polyfill for jwt decode

AppRegistry.registerComponent(appName, () => App);
