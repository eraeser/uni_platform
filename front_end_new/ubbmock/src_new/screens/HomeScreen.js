import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { connect } from "react-redux";

import { ThreadList } from '../components/Thread';
import MainHeader from '../components/utils/MainHeader';

class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <MainHeader>
          <Text>{`Welcome ${this.props.user.full_name}`}</Text>
        </MainHeader>
        <ThreadList navigation={this.props.navigation} dashboard />
      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

export default connect(mapStateToProps)(HomeScreen);
