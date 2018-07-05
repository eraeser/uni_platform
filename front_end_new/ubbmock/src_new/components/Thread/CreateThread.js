import React from 'react';
import {
  TextInput,
  Text,
  Button,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';
import { connect } from "react-redux";

import { postThreadAsync, updateThreadAsync } from '../../business/threads';
import Markdown from '../utils/CustomMarkdown';
import MainHeader from '../utils/MainHeader';

class CreateThread extends React.Component {
  constructor(props) {
    super(props);
    const thread = props.navigation.getParam('thread', '');
    const action = props.navigation.getParam('action', 'create')
    const channel = this.props.navigation.getParam('channel', 'NO-channel');
    this.state = {
      action,
      thread,
      channel,
      contentValue: thread.content || '',
      descriptionValue: thread.description || '',
      nameValue: thread.name || '',
      contentHeight: 40,
      descriptionHeight: 40,
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

  onUpdate = async () => {
    const response = await updateThreadAsync({
      name: this.state.nameValue,
      description: this.state.descriptionValue,
      content: this.state.contentValue,
      thread_id: this.state.thread.id,
    },this.props.currentUser.auth_token);
    response
    ? this.props.navigation.goBack()
    : ToastAndroid.show('Could not submit comment', ToastAndroid.LONG);
  }

  onCreate = async () => {
    const response = await postThreadAsync({
      name: this.state.nameValue,
      description: this.state.descriptionValue,
      content: this.state.contentValue,
      parent_channel: this.state.channel.id,
      author: this.props.currentUser.id,
    },this.props.currentUser.auth_token);
    response
    ? this.props.navigation.goBack()
    : ToastAndroid.show('Could not submit thread', ToastAndroid.LONG);
  }

  render() {
    const { descriptionHeight, contentHeight, channel } = this.state;

    return(
      <View>
        <MainHeader>
          <Text>{channel.name}</Text>
        </MainHeader>
        <ScrollView>
          <TextInput
            maxLength={50}
            onChangeText={nameValue => this.setState({nameValue})}
            placeholder="Name here ..."
            value={this.state.nameValue}
          />
          <TextInput
            multiline
            maxLength={255}
            value={this.state.descriptionValue}
            onChangeText={descriptionValue => this.setState({descriptionValue})}
            placeholder="Description here ..."
            style={{height: descriptionHeight}}
            onContentSizeChange={(e) => this.setState({descriptionHeight: e.nativeEvent.contentSize.height})}
          />
          <TextInput
            multiline
            maxLength={1500}
            value={this.state.contentValue}
            onChangeText={contentValue => this.setState({contentValue})}
            placeholder="Content here ..."
            style={{height: contentHeight}}
            onContentSizeChange={(e) => this.setState({contentHeight: e.nativeEvent.contentSize.height})}
          />
          {this.state.contentValue ?
            <MainHeader height={20}>
              <Text>Content Preview</Text>
            </MainHeader> : null}
          <Markdown>{this.state.contentValue}</Markdown>
        </ScrollView>
        <Button
          title="Submit"
          onPress={this.onFetch()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users,
});

export default connect(mapStateToProps)(CreateThread);
