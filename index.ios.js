/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';



var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var Overlay = require('react-native-overlay');
var BlurView = require('react-native-blur').BlurView;
var Button = require('react-native-button');



var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,

    } = React;

var Movies = require("./app/Movies");


function renderScene(route, navigator) {
    return <route.component route={route} navigator={navigator} />;
}

var Routing = React.createClass({
    render() {
        const initialRoute = {
            component: Movies
        };

        return (
            <View style={{ flex: 1, }}>
                <Navigator
                    initialRoute={initialRoute}
                    renderScene={renderScene}/>
            </View>
        );
    }
})
AppRegistry.registerComponent('codecampRNMoviesApp', () => Routing);


