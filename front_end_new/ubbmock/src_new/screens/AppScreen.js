import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ChannelScreen from './ChannelScreen';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Channels: ChannelScreen,
});
export default TabNavigator;
