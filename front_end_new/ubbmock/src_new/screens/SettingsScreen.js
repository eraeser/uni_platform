import React from 'react';
import {
    ScrollView,
    View,
    Button,
} from 'react-native';
import { connect } from "react-redux";

import { updateTokenThunk, resetUser } from '../state/actions/users';
import LocalStorage from '../state/localStorage/LocalStorage';

class SettingsScreen extends React.Component {
  _onLogoutPress = () => {
    this.props.dispatch(updateTokenThunk(''));
  }

  _onClearCache = async () => {
    await LocalStorage.clearAllAsync();
    this.props.dispatch(resetUser());
  }

  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <Button
          onPress={this._onLogoutPress}
          title="Logout"
        />
        <View style={{padding: 10}} />
        <Button
          onPress={this._onClearCache}
          title="Clear Cache"
        />
      </ScrollView>)
  }
}

export default connect()(SettingsScreen);
