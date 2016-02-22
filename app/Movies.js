var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var MoviesList = require('./components/MoviesList');
var LoadingOverlay = require('./components/LoadingOverlay');


var {
    View,
    ScrollView,
    StyleSheet,

    } = React;


var Movies = React.createClass({
    getInitialState: function () {
        fetch('http://api.themoviedb.org/3/movie/popular?api_key=4aa883f95999ec813b8bfaf319f3972b')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    loading: false,
                    data: json.results
                });
                console.log(json.results);
            })
            .catch((error) => {
                console.warn(error);
            });
        return {
            data: [],
            loading: true
        }
    },


    render: function () {
        return (

            <View style={styles.container}>
                <LoadingOverlay isVisible={this.state.loading}/>
                <NavigationBar style={styles.navbar} tintColor="#08b1ff"
                               title={{ title: 'Movie list', tintColor: "#ffffff" }}/>
                <ScrollView>
                    <View>
                        <MoviesList data={this.state.data} loading={this.state.loading}
                                    navigator={this.props.navigator}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        backgroundColor: "#08b1ff",
    },
    title: {
        color: "#fff"
    }
});

module.exports = Movies;
