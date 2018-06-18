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
  }

  _loadCacheAsync = async () => {
    let data = type === 'all' ? await getAllChannelsAsync() : await getSubscribedChannelsAsync(this.props.user.auth_token);
    console.log(data);
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
          />
      )}
      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

const ConnectedChannelList = arg => connect(mapStateToProps)(ChannelList(arg));

export default ConnectedChannelList;
