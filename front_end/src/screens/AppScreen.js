import React from 'react';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import LoginForm from './LoginForm';
import ListExample from './ListExample';

const TabNav = TabNavigator(
  {
    Login: { screen: LoginForm },
    List: { screen: ListExample },
  }, {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#000000',
    },
  }
);

export default connect()(TabNav);
