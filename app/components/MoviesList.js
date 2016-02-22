var React = require('react-native');
var MovieDetail = require('./MovieDetail');


var {
    View,
    Text,
    ListView,
    StyleSheet,
    Image,
    TouchableHighlight,
    Navigator,
    } = React;


var MoviesList = React.createClass({
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.data),
        };
    },


    renderRow: function (rowData) {
        var {
            title,
            poster_path,
            vote_average
            } = rowData;
        console.log("http://image.tmdb.org/t/p/w500" + poster_path)
        var movie = rowData;
        return (

            <View>
                <TouchableHighlight onPress={() => this.showMovieDetail(movie)} underlayColor='#dddddd'>
                    <View style={styles.item}>
                        <Image style={styles.thumbnail} source={{uri: "http://image.tmdb.org/t/p/w500"+poster_path}}/>
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <Text>{vote_average} / 10</Text>
                        </View>
                    </View>

                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        );
    },

    showMovieDetail: function (movie) {
        console.log(this.props)
        this.props.navigator.push({
            title: movie.title,
            component: MovieDetail,
            passProps: {movie}
        });

    },


    componentWillReceiveProps: function (nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
        });
    },


    render: function () {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
            </View>
        );

    },
});


var styles = StyleSheet.create({

    item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        paddingLeft: 10,
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    title: {
        fontWeight: "bold"
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    }
});


module.exports = MoviesList;
