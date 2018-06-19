
import React from 'react';
import {
  TextInput,
  Text,
  Button,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { connect } from "react-redux";

import { postCommentAsync, updateCommentAsync } from '../../business/comments';
import Markdown from '../utils/CustomMarkdown';

class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    const comment = props.navigation.getParam('comment', '');
    const thread = props.navigation.getParam('thread', '');
    const action = props.navigation.getParam('action', 'create')

    this.state = {
      action,
      comment,
      thread,
      value: comment.content || '',
      height: 40,
    }
  }

  onFetch = () => {
    switch (this.state.action) {
      case 'create':
        return this.onCreate;
      case 'edit':
        return this.onUpdate;
      default:
        return () => ToastAndroid.show('An error ocured', ToastAndroid.LONG);
    }
  }

  onCreate = async () => {
    const response = await postCommentAsync({
      content: this.state.value,
      parent_thread: this.state.thread.id,
      author: this.props.currentUser.id,
      parent_comment: null,
    },this.props.currentUser.auth_token);
    response
    ? this.props.navigation.goBack()
    : ToastAndroid.show('Could not submit comment', ToastAndroid.LONG);
  }

  onUpdate = async () => {
    const response = await updateCommentAsync({
      content: this.state.value,
      comment_id: this.state.comment.id,
    },this.props.currentUser.auth_token);
    response
    ? this.props.navigation.goBack()
    : ToastAndroid.show('Could not submit comment', ToastAndroid.LONG);
  }

  updateSize = (height) => {
    this.setState({height});
  }

  render() {
    const { height, thread } = this.state;

    return(
      <ScrollView>
        <Text>Thread: {thread.name}</Text>
        <TextInput
          multiline
          value={this.state.value}
          maxLength={500}
          onChangeText={value => this.setState({value})}
          placeholder="Comment here ..."
          style={{height}}
          onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
        />
        <Button
          title="Submit"
          onPress={this.onFetch()}
        />
        <Markdown>{this.state.value}</Markdown>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users,
});

export default connect(mapStateToProps)(CreateComment);
