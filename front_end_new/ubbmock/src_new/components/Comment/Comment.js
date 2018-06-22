import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import Markdown from '../utils/CustomMarkdown';
import Controls from '../utils/Controls';
import MainHeader from '../utils/MainHeader';

import { updateCommentAsync } from '../../business/comments';



class Comment extends React.Component {
  constructor(props){
    super(props)
    const comment = props.navigation.getParam('comment', 'NO-ID');
    const thread = props.navigation.getParam('thread', 'NO-ID');
    const user = props.navigation.getParam('user', 'NO-ID');
    this.state = {
      comment,
      thread,
      user,
    }
  }

  onEdit = () => {
    this.props.navigation.navigate(
      'CreateComment',
      {
        action: 'edit',
        comment: this.state.comment,
        thread: this.state.thread,
      },
    );
  }

  onDelete = () => {
    updateCommentAsync({
      comment_id: this.state.comment.id,
      content: this.state.comment.content,
      is_deleted: true,
    },this.state.user.auth_token);
    this.props.navigation.goBack();
  }

  render() {
    return(
      <View style={{height: '100%'}}>
        <MainHeader>
          <Controls onDelete={this.onDelete} onEdit={this.onEdit}>
            <Text>{this.state.comment.username}</Text>
          </Controls>
        </MainHeader>
        <ScrollView>
          <Markdown>{this.state.comment.content}</Markdown>
        </ScrollView>
      </View>
    );
  }
}

export default Comment;
