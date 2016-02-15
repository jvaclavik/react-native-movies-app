var React = require('react-native');

var {
    View,
    ScrollView,
    ListView
    } = React;


var MoviesList = require('./components/MoviesList');
var Movies = React.createClass({


    getInitialState() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


        fetch('http://api.themoviedb.org/3/movie/popular?api_key=4aa883f95999ec813b8bfaf319f3972b')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(json.results),
                    loaded: true,
                });
            })
            .catch((error) => {
                console.warn(error);
            });

        return {
            dataSource: ds
        }
    },

    render() {
        return (
        <View>
            <ScrollView>
                <View>
                    <MoviesList dataSource={this.state.dataSource} />
                </View>
            </ScrollView>
        </View>

        );
    }
});

module.exports = Movies;
