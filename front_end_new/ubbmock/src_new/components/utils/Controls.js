import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
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
  fillerContainer: {
    width: '33%',
    backgroundColor: '#f7f7f7',
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

const CustomFiller = (props) => {
  return (
    <View style={props.style || styles.fillerContainer} >
      <View style={styles.button}>
        {props.image ? <Image
          style={{width: 40, height: 40, borderRadius: 40}}
          source={
            {uri: props.image }
          }
        /> : null }
      </View>
    </View>
  );
}

const Controls = (props) => (
  <View style={styles.header}>
    {props.onDelete && props.enable
    ? <CustomButton onPress={props.onDelete} title='Delete' />
    : <CustomFiller image={props.image} />}
    <View style={styles.fillerContainer}>
      {props.children}
    </View>
    {props.onEdit && props.enable
    ? <CustomButton onPress={props.onEdit} title='Edit' />
    : <CustomFiller image={props.image} />}
  </View>
)

export default Controls;
