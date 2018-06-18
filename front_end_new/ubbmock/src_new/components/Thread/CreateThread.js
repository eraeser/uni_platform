
import React from 'react';
import {
  TextInput,
  Text,
  Button,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { connect } from "react-redux";

import { postThreadAsync } from '../../business/threads';
import Markdown from '../utils/CustomMarkdown';

class CreateThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentValue: '',
      descriptionValue: '',
      nameValue: '',
      contentHeight: 40,
      descriptionHeight: 40,
    }
  }

  render() {
    const channel = this.props.navigation.getParam('channel', 'NO-Thread');

    const { descriptionHeight, contentHeight } = this.state;

    return(
      <ScrollView>
        <Text>Channel: {channel.name}</Text>
        <TextInput
          maxLength={50}
          onChangeText={nameValue => this.setState({nameValue})}
          placeholder="Name here ..."
        />
        <TextInput
          multiline
          maxLength={255}
          onChangeText={descriptionValue => this.setState({descriptionValue})}
          placeholder="Description here ..."
          style={{height: descriptionHeight}}
          onContentSizeChange={(e) => this.setState({descriptionHeight: e.nativeEvent.contentSize.height})}
        />
        <TextInput
          multiline
          maxLength={1500}
          onChangeText={contentValue => this.setState({contentValue})}
          placeholder="Content here ..."
          style={{height: contentHeight}}
          onContentSizeChange={(e) => this.setState({contentHeight: e.nativeEvent.contentSize.height})}
        />
        <Button
          title="Submit"
          onPress={async () => {
            const response = await postThreadAsync({
              name: this.state.nameValue,
              description: this.state.descriptionValue,
              content: this.state.contentValue,
              parent_channel: channel.id,
              author: this.props.currentUser.id,
            },this.props.currentUser.auth_token);
            response
            ? this.props.navigation.goBack()
            : ToastAndroid.show('Could not submit comment', ToastAndroid.LONG);
          }}
        />
        <Markdown>{this.state.contentValue}</Markdown>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users,
});

export default connect(mapStateToProps)(CreateThread);
