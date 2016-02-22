var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var Button = require('react-native-button');


var {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    AsyncStorage,
    } = React;

var STORAGE_KEY = "watchedMovies";
var BUTTON_TEXT_WATCHED = "Marked as unwatched";
var BUTTON_TEXT_UNWATCHED = "Marked as watched";


var MovieDetail = React.createClass({


    getInitialState() {
        return {
            watchedMovies: [],
            buttonText: BUTTON_TEXT_UNWATCHED
        };
    },

    componentDidMount: function () {
        this._loadInitialState();
    },

    setTextWatched: function(){
        var text = BUTTON_TEXT_WATCHED
        this.setState({buttonText: text});
        return text;
    },
    setTextUnwatched: function(){
        var text = BUTTON_TEXT_UNWATCHED
        this.setState({buttonText: text});
        return text;
    },
    _loadInitialState: function () {
        var self = this;
        var thisId = this.props.route.passProps.movie.id;
        try {
            var promise = AsyncStorage.getItem(STORAGE_KEY);
            promise.then(function (value) {
                try {
                    value = JSON.parse(value);
                } catch (e){

                }
                if (value !== null) {
                    self.setState({watchedMovies: value});
                    console.log(value)

                    self.state.watchedMovies.forEach(function (movieId, index) {
                        if (movieId == thisId) {
                            self.setTextWatched();
                        }
                    });
                } else {
                    console.log("nic")
                }
            })

        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    },

    _onValueChange: function () {
        var self = this;
        var thisId = this.props.route.passProps.movie.id;
        console.log("this.state.watchedMovies", self.state.watchedMovies);
        var alreadyWatched = false;
        if (self.state.watchedMovies) {
            self.state.watchedMovies.forEach(function (movieId, index) {
                if (movieId == thisId) {

                    self.setState({
                        watchedMovies: self.state.watchedMovies.filter(function(element, index){
                            return element != movieId
                        })
                    });
                    alreadyWatched = true;
                    self.setTextUnwatched();
                }
            });



        } else {
            self.setState({watchedMovies: []});
        }
        if(!alreadyWatched) {
            self.setState({watchedMovies: self.state.watchedMovies.concat([thisId])})
            self.setTextWatched();
        }
        try {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(self.state.watchedMovies));
            console.log('Saved selection to disk: ' +self.state.watchedMovies);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    },


    render: function () {
        var movie = this.props.route.passProps.movie;
        return (
            <View>
                <NavigationBar style={styles.navbar} tintColor="#08b1ff"
                               title={{ title: movie.title, tintColor: "#ffffff" }}
                               leftButton={{ title: "Back", tintColor: "#fff", handler: this.props.navigator.pop}}/>
                <ScrollView style={styles.scroll}>

                    <Image style={styles.image} source={{uri: "http://image.tmdb.org/t/p/w500/"+movie.backdrop_path}}/>
                    <Text style={styles.overview}>{movie.overview}</Text>
                    <Button
                        containerStyle={styles.buttonContainer}
                        style={styles.button}
                        styleDisabled={{color: 'red'}}
                        onPress={this._onValueChange}
                    >
                        {this.state.buttonText}
                    </Button>
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
    scroll: {
        flex: 1
    },
    navbar: {
        backgroundColor: "#08b1ff",
        flex: 1
    },
    overview: {
        padding: 10
    },
    button: {
        fontSize: 20,
        color: '#fff',

    },
    buttonContainer: {
        padding: 10,
        height: 45,
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#08b1ff',
        marginLeft: 20,
        marginRight: 20,
    }
});


module.exports = MovieDetail;