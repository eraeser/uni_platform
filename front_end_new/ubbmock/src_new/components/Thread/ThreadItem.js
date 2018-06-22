import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const names = ['empire', 'resistance', 'fort-awesome', 'firefox', 'chrome'];

const ThreadItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPressItem(props.item)}>
      <View style={{flexDirection: 'row' }}>
        {/* <Image
          style={{width: 50, height: 50, borderRadius: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        /> */}
        <FontAwesome name={names[Math.floor(Math.random() * names.length)]} size={50} color="black" />
        <View style={{marginLeft: 10}}>
          <Text>
            {props.item.name}
          </Text>
          <Text>
            {props.item.description.split('\n')[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ThreadItem;
