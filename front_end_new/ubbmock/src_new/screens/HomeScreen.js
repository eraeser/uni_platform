import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
} from 'react-native';
import { connect } from "react-redux";

import { updateTokenThunk } from '../state/actions/users';

class HomeScreen extends React.Component {
  _onLogoutPress = () => {
    this.props.dispatch(updateTokenThunk(''));
  }

  render() {
    return (
      <ScrollView style={{padding: 20}}>
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

export default connect(mapStateToProps)(HomeScreen);
