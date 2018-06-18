import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

const ThreadItem = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPressItem(props.item)}>
      <View style={{flexDirection: 'row' }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <View>
          <Text>
            {props.item.name}
          </Text>
          <Text>
            {props.item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ThreadItem;