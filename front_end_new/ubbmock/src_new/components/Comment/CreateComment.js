
import React from 'react';
import {
  TextInput,
  Text,
  Button,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { connect } from "react-redux";

import { postCommentAsync } from '../../business/comments';
import Markdown from '../utils/CustomMarkdown';

class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      height: 40,
    }
  }

  updateSize = (height) => {
    this.setState({height});
  }

  render() {
    const itemComment = this.props.navigation.getParam('item', 'NO-ID');
    const thread = this.props.navigation.getParam('thread', 'NO-Thread');

    const { height } = this.state;

    return(
      <ScrollView>
        <Text>Thread: {thread.name}</Text>
        {itemComment.username && <Text>User: {JSON.stringify(itemComment.username)}</Text>}
        {itemComment.content && <Text>Content: {JSON.stringify(itemComment.content)}</Text>}
        <TextInput
          multiline
          maxLength={500}
          onChangeText={value => this.setState({value})}
          placeholder="Comment here ..."
          style={{height}}
          onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
        />
        <Button
          title="Submit"
          onPress={async () => {
            const response = await postCommentAsync({
              content: this.state.value,
              parent_thread: thread.id,
              author: this.props.currentUser.id,
              parent_comment: itemComment.id || null,
            },this.props.currentUser.auth_token);
            response
            ? this.props.navigation.goBack()
            : ToastAndroid.show('Could not submit comment', ToastAndroid.LONG);
          }}
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
