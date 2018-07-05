import React from 'react';
import {
  TextInput,
  Text,
  Button,
  ScrollView,
  ToastAndroid,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from "react-redux";

import { updateChannelAsync } from '../../business/channels';
import MainHeader from '../utils/MainHeader';

var ImagePicker = require('react-native-image-picker');

class CreateThread extends React.Component {
  constructor(props) {
    super(props);
    const channel = this.props.navigation.getParam('channel', 'NO-channel');
    this.state = {
      channel,
      image: channel.icon || null,
      descriptionValue: channel.description || '',
      descriptionHeight: 40,
    }
  }

  onUpdate = async () => {
    const response = await updateChannelAsync({
      description: this.state.descriptionValue,
      image: this.state.image,
      channel_id: this.state.channel.id,
    },this.props.currentUser.auth_token);
    response
    ? this.props.navigation.goBack()
    : ToastAndroid.show('Could not submit comment', ToastAndroid.LONG);
  }

    selectPhotoTapped = () => {
      const options = {
        quality: 1.0,
        maxWidth: 100,
        maxHeight: 100,
        storageOptions: {
          skipBackup: true,
        },
      };

      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = 'data:image/jpeg;base64,' + response.data;

          this.setState({
            image: source,
          });
        }
      });
  }

  render() {
    const { descriptionHeight, channel } = this.state;

    return(
      <View>
        <MainHeader>
          <Text>{channel.name}</Text>
        </MainHeader>
        <ScrollView>
          <TouchableOpacity style={{alignSelf: 'center', marginTop: 10}} onPress={this.selectPhotoTapped}>
            <View>
              { this.state.image === null
                ? <Text>Select a Photo</Text>
                : <Image style={{width: 66.6, height: 66.6, borderRadius: 66.6}} source={{uri: this.state.image}} />
              }
            </View>
          </TouchableOpacity>
          <TextInput
            multiline
            maxLength={255}
            value={this.state.descriptionValue}
            onChangeText={descriptionValue => this.setState({descriptionValue})}
            placeholder="Description here ..."
            style={{height: descriptionHeight}}
            onContentSizeChange={(e) => this.setState({descriptionHeight: e.nativeEvent.contentSize.height})}
          />
        </ScrollView>
        <Button
          title="Submit"
          onPress={this.onUpdate}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users,
});

export default connect(mapStateToProps)(CreateThread);
