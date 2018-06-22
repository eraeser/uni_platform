import React from 'react';
import {
    View,
} from 'react-native';
import { connect } from "react-redux";

import ListComponent from '../../components/utils/ListComponent';
import AppLoading from '../../app/AppLoading';
import ChannelItem from './ChannelItem';

import {
  getAllChannelsAsync,
  getSubscribedChannelsAsync,
} from '../../business/channels';

import LocalStorage from '../../state/localStorage/LocalStorage';

// MOCK DATA
let _data;
// _data = require('../utils/mockdata').channels;

const ChannelList = type => class CustomList extends React.Component {

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
    console.log('on unmount');
    clearInterval(this.intervalId);
  }

  _getDataFromServerAsync = async () => {
    let data = type === 'all' ? await getAllChannelsAsync() : await getSubscribedChannelsAsync(this.props.user.auth_token);
    type === 'all' ? LocalStorage.saveCommentsAsync({data}) : LocalStorage.saveSubscribedChannelsAsync({data})
    console.log('CHANNELS FROM SERVER');
    // console.log(data);
    this.setState({data: data});
  }

  _loadCacheAsync = async () => {
    let data;
    data = type === 'all' ? await LocalStorage.getChannelsAsync() : await LocalStorage.getSubscribedChannelsAsync();
    if (data.data) {
      data = data.data
      console.log('CHANNELS FROM CACHE');
    } else {
      data = type === 'all' ? await getAllChannelsAsync() : await getSubscribedChannelsAsync(this.props.user.auth_token);
      type === 'all' ? LocalStorage.saveCommentsAsync({data}) : LocalStorage.saveSubscribedChannelsAsync({data})
      console.log('CHANNELS FROM SERVER');
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
            itemModel={ChannelItem}
            onPressItem={item => {
              this.props.navigation.navigate('Channel', {item: item});
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

const ConnectedChannelList = arg => connect(mapStateToProps)(ChannelList(arg));

export default ConnectedChannelList;
