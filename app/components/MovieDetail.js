var React = require('react-native');
var NavigationBar = require('react-native-navbar');


var {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    } = React;


var MovieDetail = React.createClass({
    render: function () {
        console.log(this.props)
        var movie = this.props.route.passProps.movie;
        return (
            <View>
                <NavigationBar style={styles.navbar} tintColor="#08b1ff"
                               title={{ title: movie.title, tintColor: "#ffffff" }}
                               leftButton={{ title: "Back", tintColor: "#fff", handler: this.props.navigator.pop}}/>
                <ScrollView>

                    <Image style={styles.image} source={{uri: "http://image.tmdb.org/t/p/w500/"+movie.backdrop_path}}/>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </ScrollView>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: "row",
        height: 200,
        padding: 10
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
    navbar: {
        backgroundColor: "#08b1ff",
        flex: 1
    },
    overview: {
        padding: 10
    }
});


module.exports = MovieDetail;