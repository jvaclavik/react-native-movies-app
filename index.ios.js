/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';



var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    } = React;

var Movies = require("./app/Movies");

AppRegistry.registerComponent('codecampRNMoviesApp', () => Movies);

