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
  }

  _loadCacheAsync = async () => {
    let data;
    if (this.props.channel_id) {
      console.log(this.props.channel_id);
      data = await getChannelThreadsAsync(this.props.channel_id);
    } else if(this.props.dashboard) {
      data = await getDashboardAsync(this.props.user.auth_token);
    }
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
            itemModel={ThreadItem}
            onPressItem={item => {
              this.props.navigation.navigate('Thread', {item: item});
            }}
            onRefresh={this._loadDataAsync}
          />
      )}
      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

export default connect(mapStateToProps)(ThreadList);
