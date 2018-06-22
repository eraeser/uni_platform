import React from 'react';
import {
    View,
} from 'react-native';
import { connect } from "react-redux";

import ListComponent from '../../components/utils/ListComponent';
import AppLoading from '../../app/AppLoading';
import ThreadItem from './ThreadItem';

import {
  getChannelThreadsAsync,
  getDashboardAsync,
} from '../../business/threads';

import LocalStorage from '../../state/localStorage/LocalStorage';

// MOCK DATA
let _data;
// _data = require('../utils/mockdata').threads;

class ThreadList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isReady: false,
    }
    this.intervalId = null;
  }

  componentDidMount() {
    if (this.props.online) {
      this.intervalId = setInterval(this._getDataFromServerAsync, 5000);
    }
  }

  componentDidUpdate() {
    if (!this.props.online) {
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  _getDataFromServerAsync = async () => {
    let data;
    if (this.props.channel_id) {
      data = await getChannelThreadsAsync(this.props.channel_id);
      let threads = {};
      threads[`${this.props.channel_id}`] = data;
      await LocalStorage.saveThreadsAsync(threads);
      console.log('THREADS FROM SERVER');
    } else if(this.props.dashboard) {
      data = await getDashboardAsync(this.props.user.auth_token);
      await LocalStorage.saveDashboardAsync(data);
      console.log('DASH FROM SERVER');
    }
    // console.log(data);
    this.setState({data: data});
  }

  _loadCacheAsync = async () => {
    let data;
    if (this.props.channel_id) {
      // console.log(this.props.channel_id);
      data = await LocalStorage.getThreadsAsync()
      if (data[`${this.props.channel_id}`]) {
        console.log('THREADS FROM CACHE');
        data = data[`${this.props.channel_id}`]
      } else {
        data = await getChannelThreadsAsync(this.props.channel_id);
        let threads = {};
        threads[`${this.props.channel_id}`] = data;
        LocalStorage.saveThreadsAsync(threads);
        console.log('THREADS FROM SERVER');
      }
    } else if(this.props.dashboard) {
      data = await LocalStorage.getDashboardAsync();
      if (data.threads) {
        data = data.threads;
        console.log('DASH FROM CACHE');
        // console.log(data);
      } else {
        data = await getDashboardAsync(this.props.user.auth_token);
        LocalStorage.saveDashboardAsync(data);
        console.log('DASH FROM SERVER');
      }
    }
    // console.log(data);
    this.setState({data: data});
  };

  _loadDataAsync = async () => {
    return await Promise.all([this._loadCacheAsync()]);
  };

  render() {
    return (
      <View style={{padding: 20}}>
        {!this.state.isReady ? (
          <AppLoading
            startAsync={this._loadDataAsync}
            onError={e => console.error(e)}
            onFinish={() => {
              this.setState({
                isReady: true,
              });}}
          />
        ) : (
          <ListComponent
            data={_data || this.state.data}
            itemModel={ThreadItem}
            onPressItem={item => {
              this.props.navigation.navigate('Thread', {thread: item, user: this.props.user});
            }}
            onRefresh={this._getDataFromServerAsync}
          />
      )}
      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
  online: state.internals.connectivity,
});

export default connect(mapStateToProps)(ThreadList);
