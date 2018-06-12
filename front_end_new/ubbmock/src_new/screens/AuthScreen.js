import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
} from 'react-native';
import { connect } from "react-redux";


import { logInUser } from '../business/user';
import { updateTokenThunk, setUserThunk } from '../state/actions/users';

export class AuthScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
    }
  }

  render() {
      return (
        <ScrollView style={{padding: 20}}>
          {this.props.user.full_name ?
            <Text
              style={{fontSize: 10}}
            >
              {`Last logged in as ${this.props.user.full_name}`}
            </Text> :
            null}
          <Text
            style={{fontSize: 27}}
          >
            Login
          </Text>
          <TextInput
            placeholder='Username'
            onChangeText={username => this.setState({username})}
          />
          <TextInput
            placeholder='Password'
            onChangeText={password => this.setState({password})}
            secureTextEntry
          />
          <View style={{margin:7}} />
          <Button
            onPress={async () => {
              const {token, user} = await logInUser({username: this.state.username, password: this.state.password});
              this.props.dispatch(updateTokenThunk(token));
              this.props.dispatch(setUserThunk(user))
            }}
            title="Submit"
          />
        </ScrollView>
          )
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

export default connect(mapStateToProps)(AuthScreen);
