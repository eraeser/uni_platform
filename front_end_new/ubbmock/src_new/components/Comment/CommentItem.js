import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import Markdown from '../utils/CustomMarkdown';

const CommentItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPressItem(props.item)}>
      <View style={{flexDirection: 'row' }}>
        <View>
          <Text>
            {props.item.username}
          </Text>
          <Markdown>
            {props.item.content}
          </Markdown>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CommentItem;
