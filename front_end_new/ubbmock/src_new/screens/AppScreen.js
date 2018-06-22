/* eslint-disable react/display-name */
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './HomeScreen';
import ChannelListScreen from './ChannelListScreen';
import SettingsScreen from './SettingsScreen';
import Thread, { CreateThread } from '../components/Thread';
import Comment, { CreateComment } from '../components/Comment';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Channels: ChannelListScreen,
  Settings: SettingsScreen,
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;

      switch (routeName) {
        case 'Home':
          iconName = `home`;
          break;
        case 'Channels':
          iconName = `list-ul`;
          break;
        case 'Settings':
          iconName = `gears`;
          break;
        default:
          iconName = 'bug';
      }
      return <FontAwesome name={iconName} size={20} color={tintColor} />;
    },
  }),
});

const StackNavigator = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
  },
  Thread: {
    screen: Thread,
  },
  Comment: {
    screen: Comment,
  },
  CreateComment: {
    screen: CreateComment,
  },
  CreateThread: {
    screen: CreateThread,
  }},
  {
    initialRouteName: 'Tabs',
    headerMode: 'none',
  });

export default StackNavigator;
