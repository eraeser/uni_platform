import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from "react-redux";

import { ThreadList } from '../Thread';
import MainHeader from '../utils/MainHeader';
import Controls from '../utils/Controls';

const styles = StyleSheet.create({
  fab: {
    width: 80,
    height: 40,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#f7f7f7',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 0.33,
    position: 'absolute',
    bottom: -1,
    zIndex: 1000000000000,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "#3478f6",
  },
});

class Channel extends React.Component {
  constructor(props) {
    super(props)
    const channel = this.props.navigation.getParam('item', 'NO-ID');
    this.state = {
      channel,
    }
  }

  onEdit = () => {
    this.props.navigation.navigate(
      'EditChannel', { channel: this.state.channel },
    );
  }

  render() {

    return(
      <View style={{height: '100%'}}>
        <MainHeader>
          <Controls image={this.state.channel.icon} onEdit={this.onEdit} enable={this.props.user.is_admin}>
            <Text numberOfLines={2} ellipsizeMode='tail' style={{textAlign: 'center'}}>{this.state.channel.name}</Text>
          </Controls>
        </MainHeader>
        <ThreadList navigation={this.props.navigation} channel_id={this.state.channel.id} />
        {this.props.user.is_admin ?
          <View style={styles.fab}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateThread', {'channel': this.state.channel})}>
              <Text style={styles.text}>Post</Text>
            </TouchableOpacity>
          </View> : null }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users,
})

export default connect(mapStateToProps)(Channel);
