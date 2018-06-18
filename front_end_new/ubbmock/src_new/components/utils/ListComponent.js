/* eslint-disable react/no-multi-comp */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';

class DefaultItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text>
            {this.props.item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class ListComponent extends React.PureComponent {

  state = {
    refreshing: false,
  }

  _keyExtractor = (item, index) => item.id;

  _onPressItem = id => {
    console.log(id);
  };

  _onRefresh = () => {
    this.setState({refreshing: true})
    this.props.onRefresh().then(() => this.setState({refreshing: false}))
  }

  _renderItem = ({item}) => {
    const Item = this.props.itemModel || DefaultItem;
    return (
      <Item
        id={item.id}
        onPressItem={this.props.onPressItem || this._onPressItem}
        item={item}
      />);
  };

  render() {
    return (
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{marginBottom: 10}} />
        )}
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        ListFooterComponent={() => <View style={{height: 100}} />}
      />
    );
  }
}
