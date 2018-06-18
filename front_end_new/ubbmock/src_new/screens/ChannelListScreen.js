import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Channel, { ChannelList } from '../components/Channel';

const TabNavigator = createMaterialTopTabNavigator({
  Subscribed: {
    screen: ChannelList('subscribed'),
  },
  All: {
    screen: ChannelList('all'),
  },
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
