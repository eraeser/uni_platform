import React from 'react';
import {
    ScrollView,
    Button,
} from 'react-native';
import { connect } from "react-redux";

import { updateTokenThunk } from '../state/actions/users';

class SettingsScreen extends React.Component {
  _onLogoutPress = () => {
    this.props.dispatch(updateTokenThunk(''));
  }

  render() {
    return (
      <ScrollView style={{padding: 20}}>
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

export default connect(mapStateToProps)(SettingsScreen);
