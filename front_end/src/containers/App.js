import React from 'react';
import { connect } from "react-redux";
import { Linking, View, Text } from 'react-native';
import { List, Record } from 'immutable';
import '../utils/websocket';
import  AppScreen from '../screens/AppScreen';
// import AuthenticationScreen from '../screens/AuthentificationScreen';
import AppLoading from '../utils/AppLoading';
// import User from '../state/records/User';
import { Item } from '../state/records/Item';
import LocalStorage from '../state/localStorage/LocalStorage_lab5';
import AllItems from '../data/items';
import { setItems } from '../state/actions/items';

export class App extends React.Component {

  state = {
    isReady: false,
  }

  _loadCacheAsync = async () => {
    // let user = new User(await LocalStorage.getUserAsync());
    let items_to_populate = new List(AllItems.map(data => new Item(data)));
    let items = await LocalStorage.getExampleListAsync()
    if(items && items.length) {
      items = new List(items.map(data => new Item(data)));
      this.props.dispatch(setItems(items));
      console.log('in cache', items);
    }
    else {
      this.props.dispatch(setItems(items_to_populate));
      console.log('in static', items_to_populate);
    }

    // this.props.dispatch(Actions.setCurrentUser(user));

    // this.props.dispatch(Actions.setVisitedBreweries(visitedBreweries));
  };

  _loadDataAsync = async () => {
    return Promise.all([this._loadCacheAsync()]);
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

    return (
        /* {isSignedIn(this.props.currentUser) ? (
          <AppScreen />
        ) : (
          <AuthenticationScreen />
        )} */
      <AppScreen />
    );
  }
}

export default connect()(App);

// function isSignedIn(userState) {
//   return !!userState.authToken || userState.isGuest;
// }
