/* eslint-disable react/no-multi-comp */

import React from 'react';
import {
    View,
} from 'react-native';
import { connect } from "react-redux";

import ListComponent from '../../components/utils/ListComponent';
import AppLoading from '../../app/AppLoading';
import CommentItem from './CommentItem';

import {
  getThreadCommentsAsync,
} from '../../business/comments';

// MOCK DATA
let _data;
// _data = require('../utils/mockdata').comments;

class CommentList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isReady: false,
    }
  }

  _loadCacheAsync = async () => {
    let data = await getThreadCommentsAsync(this.props.thread_id);
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
            itemModel={CommentItem}
            onPressItem={item => {
              this.props.navigation.navigate('Comment', {item: item});
            }}
          />
      )}
      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});


export default connect(mapStateToProps)(CommentList);
