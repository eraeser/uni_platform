import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
} from 'react-native';
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{padding: 20}}>
        <Text
          style={{fontSize: 27}}
        >
          {`Welcome ${this.props.user.full_name}`}
        </Text>
      </ScrollView>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

export default connect(mapStateToProps)(HomeScreen);
