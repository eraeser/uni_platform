import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import Markdown from '../utils/CustomMarkdown';

class Comment extends React.Component {
  render() {
    const itemComment = this.props.navigation.getParam('item', 'NO-ID');

    return(
      <View>
        <Text>{itemComment.username}</Text>
        <Markdown>{itemComment.content}</Markdown>
      </View>
    );
  }
}

export default Comment;
