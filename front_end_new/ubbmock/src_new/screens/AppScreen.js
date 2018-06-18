import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ChannelListScreen from './ChannelListScreen';
import SettingsScreen from './SettingsScreen';
import Thread, { CreateThread } from '../components/Thread';
import Comment, { CreateComment } from '../components/Comment';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Channels: ChannelListScreen,
  Settings: SettingsScreen,
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
