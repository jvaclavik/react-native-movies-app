var React = require('react-native');

var {
    View,
    ScrollView,

    } = React;


var MoviesList = require('./components/MoviesList');

var Movies = React.createClass({
    getInitialState() {

        fetch('http://api.themoviedb.org/3/movie/popular?api_key=4aa883f95999ec813b8bfaf319f3972b')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    loading: false,
                    data: json.results
                });
            })
            .catch((error) => {
                console.warn(error);
            });

        return {
            data: [],
            loading: true
        }
    },

    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <MoviesList data={this.state.data} loading={this.state.loading}/>
                    </View>
                </ScrollView>
            </View>

        );
    }
});

module.exports = Movies;
