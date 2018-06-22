import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ThreadList } from '../Thread';
import MainHeader from '../utils/MainHeader';

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
  render() {
    const itemChannel = this.props.navigation.getParam('item', 'NO-ID');

    return(
      <View style={{height: '100%'}}>
        <MainHeader><Text>{itemChannel.name}</Text></MainHeader>
        <ThreadList navigation={this.props.navigation} channel_id={itemChannel.id} />
        <View style={styles.fab}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateThread', {'channel': itemChannel})}>
            <Text style={styles.text}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Channel;
