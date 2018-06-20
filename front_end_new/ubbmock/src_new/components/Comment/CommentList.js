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

import LocalStorage from '../../state/localStorage/LocalStorage';

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

  componentDidMount() {
    setInterval(this._getDataFromServerAsync, 5000);
  }

  componentWillUnmount() {
    clearInterval()
  }

  _getDataFromServerAsync = async () => {
    let data;
    data = await getThreadCommentsAsync(this.props.thread.id);
    let comments = {};
    comments[`${this.props.thread.id}`] = data;
    LocalStorage.saveCommentsAsync(comments);
    console.log('COMMS FROM SERVER');
    // console.log(data);
    this.setState({data: data});
  }

  _loadCacheAsync = async () => {
    let data;
    data = await LocalStorage.getCommentsAsync()
    // console.log(data);
    if (data[`${this.props.thread.id}`]) {
      data = data[`${this.props.thread.id}`]
      console.log('COMMS FROM CACHE');
    } else {
      data = await getThreadCommentsAsync(this.props.thread.id);
      let comments = {};
      comments[`${this.props.thread.id}`] = data;
      LocalStorage.saveCommentsAsync(comments);
      console.log('COMMS FROM SERVER');
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
            itemModel={CommentItem}
            onPressItem={item => {
              this.props.navigation.navigate('Comment', {comment: item, thread: this.props.thread, user: this.props.user});
            }}
            onRefresh={this._getDataFromServerAsync}
          />
      )}
      </View>)
  }
}

const mapStateToProps = state => ({
  user: state.users,
});


export default connect(mapStateToProps)(CommentList);
