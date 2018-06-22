/* eslint-disable react/display-name */
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Channel, { ChannelList } from '../components/Channel';

const TabNavigator = createMaterialTopTabNavigator({
  Subscribed: {
    screen: ChannelList('subscribed'),
  },
  All: {
    screen: ChannelList('all'),
  },
}, {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#3478f6',
    inactiveTintColor : '#f7f7f7',
    labelStyle: {
      marginTop: 0,
      marginBottom: 0,
      fontSize: 12,
      color: '#3478f6',
    },
    tabStyle: {
      height: 49,
    },
    style: {
      backgroundColor: '#f7f7f7',
    },
  },
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;

      switch (routeName) {
        case 'All':
          iconName = `rss`;
          break;
        case 'Subscribed':
          iconName = `bell-o`;
          break;
        default:
          iconName = 'bug';
      }
      return <FontAwesome name={iconName} size={20} color={tintColor} />;
    },
  }),
});

const StackNavigator = createStackNavigator({
  Lists: {
    screen: TabNavigator,
  },
  Channel: {
    screen: Channel,
  }},
  {
    initialRouteName: 'Lists',
    headerMode: 'none',
  });

export default StackNavigator;
