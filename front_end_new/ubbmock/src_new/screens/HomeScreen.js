import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { connect } from "react-redux";

import { ThreadList } from '../components/Thread';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{padding: 20}}>
        <Text
          style={{fontSize: 27}}
        >
          {`Welcome ${this.props.user.full_name}`}
        </Text>
        <ThreadList navigation={this.props.navigation} dashboard />
      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

export default connect(mapStateToProps)(HomeScreen);
