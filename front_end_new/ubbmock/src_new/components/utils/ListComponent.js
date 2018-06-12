/* eslint-disable react/no-multi-comp */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class ListComponent extends React.PureComponent {
  _keyExtractor = (item, index) => item.id;

  _onPressItem = id => {
    console.log(id);
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this.props.onPressItem || this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
