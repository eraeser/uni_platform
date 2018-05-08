import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Item from './listScreens/Item';
import MainList from './listScreens/MainList';

const StackNav = StackNavigator({
  Home: {
    screen: MainList,
    navigationOptions: {
      title: 'Test List',
      header: null,
    },
  },
  Item: {
    screen: Item,
    path: 'item/:name',
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title}`,
      headerLeft: <Icon
        name="chevron-left"
        onPress={() => navigation.goBack(null)}
        size={20}
        // margin={5}
        color='#000000'
      />,
      headerRight: <Icon
        name="check"
        onPress={() => {
          navigation.state.params.handleSave()
          navigation.goBack(null)
        }}
        size={20}
        color='#000000'
      />,
    }),
   },
});

export default connect()(StackNav);
