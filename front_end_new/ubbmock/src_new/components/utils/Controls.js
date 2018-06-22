import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    maxWidth: '33%',
    backgroundColor: '#e9e9ef',
  },
  button: {
    height: '100%',
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#3467f8',
  },
});

const CustomButton = (props) => {
  return (
    <View style={props.style || styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Controls = (props) => (
  <View style={styles.header}>
    <CustomButton onPress={props.onDelete} title='Delete' />
    {props.children}
    <CustomButton
      onPress={props.onEdit}
      title='Edit'
    />
  </View>
)

export default Controls;
