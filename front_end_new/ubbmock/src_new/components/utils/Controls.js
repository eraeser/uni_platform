import React from 'react';
import {
  View,
  Button,
} from 'react-native';

const Controls = (props) => (
  <View>
    <Button onPress={props.onDelete} title='Delete' />
    <Button
      onPress={props.onEdit}
      title='Edit'
    />
  </View>
)

export default Controls;
