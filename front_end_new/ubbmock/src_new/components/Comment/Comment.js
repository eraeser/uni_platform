import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';

import Markdown from '../utils/CustomMarkdown';
import Controls from '../utils/Controls';
import MainHeader from '../utils/MainHeader';

import { updateCommentAsync } from '../../business/comments';



class Comment extends React.Component {
  constructor(props){
    super(props)
    const comment = props.navigation.getParam('comment', 'NO-ID');
    const thread = props.navigation.getParam('thread', 'NO-ID');
    this.state = {
      comment,
      thread,
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
    },this.props.user.auth_token);
    this.props.navigation.goBack();
  }

  render() {
    return(
      <View style={{height: '100%'}}>
        <MainHeader>
          <Controls onDelete={this.onDelete} onEdit={this.onEdit} enable={this.props.user.id === this.state.comment.author}>
            <Text style={{textAlign: 'center'}}>{this.state.comment.username}</Text>
          </Controls>
        </MainHeader>
        <ScrollView>
          <Markdown>{this.state.comment.content}</Markdown>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users,
})

export default connect(mapStateToProps)(Comment);
