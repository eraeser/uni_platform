import React from 'react';
import { connect } from "react-redux";

import AppLoading from './AppLoading';
import LogIn from '../screens/AuthScreen';
import MainApp from '../screens/AppScreen';

import LocalStorage from '../state/localStorage/LocalStorage';
import { setUser } from '../state/actions/users';

function isSignedIn(userState) {
  return !!userState.auth_token;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isReady: false,
    }
  }

  _fakeAsyncCall = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  _loadCacheAsync = async () => {
    await LocalStorage.checkKeyConsistency()
    let user = await LocalStorage.getUserAsync();

    console.log(user);

    this.props.dispatch(setUser(user));
  };

  _loadDataAsync = async () => {
    return await Promise.all([this._loadCacheAsync()]);
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadDataAsync}
          onError={e => console.error(e)}
          onFinish={() => {
            this.setState({
              isReady: true,
            });
          }}
        />
      );
    }

    return (isSignedIn(this.props.currentUser)
      ? <MainApp />
      : <LogIn />);
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.users,
});

export default connect(mapStateToProps)(App);
