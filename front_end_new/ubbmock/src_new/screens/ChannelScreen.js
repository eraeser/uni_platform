import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
} from 'react-native';
import { connect } from "react-redux";
import { createMaterialTopTabNavigator } from 'react-navigation';

const ChannelList = type => class PlaceHolder extends React.Component {

  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <Text
          style={{fontSize: 27}}
        >
          {`Welcome ${this.props.user.full_name} ${type}`}
        </Text>
        <Text
          style={{fontSize: 27}}
        >
          {`Welcome ${this.props.user.full_name}`}
        </Text>
        <Text
          style={{fontSize: 27}}
        >
          {`Welcome ${this.props.user.full_name}`}
        </Text>
        <Text
          style={{fontSize: 27}}
        >
          {`Welcome ${this.props.user.full_name}`}
        </Text>
        <Text
          style={{fontSize: 27}}
        >
          {`Welcome ${this.props.user.full_name}`}
        </Text>

        <View style={{margin:20}} />
        <Button
          onPress={this._onLogoutPress}
          title="Logout"
        />
      </ScrollView>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

const ConnectedChannelList = arg => connect(mapStateToProps)(ChannelList(arg));

const TabNavigator = createMaterialTopTabNavigator({
  Followed: {
    screen: ConnectedChannelList('followed'),
  },
  All: {
    screen: ConnectedChannelList('all'),
  },
});

export default TabNavigator;
