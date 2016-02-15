var React = require('react-native');

var {
    View,
    Text,
    ListView,
    } = React;

var MoviesList = React.createClass({
    getInitialState: function() {

        return {

        };
    },
    renderRow(rowData) {
        var {
            title
            } = rowData;

        return(
            <View>
                <Text>{title}</Text>
            </View>
        );
    },

    render: function() {
        console.log("props data",this.props.data)
        return (
            <ListView
                dataSource={this.props.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
            />
        );
    },
});

module.exports = MoviesList;
