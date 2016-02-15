var React = require('react-native');

var {
    View,
    Text,
    ListView,
    StyleSheet,
    ActivityIndicatorIOS,
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
            title
            } = rowData;
        return (
            <View>

                <Text>{title}</Text>
            </View>
        );
    },


    componentWillReceiveProps: function (nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
        });
    },




    render: function () {
        return (
            <View>
                <ActivityIndicatorIOS
                    animating={this.props.loading}
                    size="large"
                    color="#00aa00"
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = MoviesList;
