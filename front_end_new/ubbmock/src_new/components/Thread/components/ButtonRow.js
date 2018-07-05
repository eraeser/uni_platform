import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#e9e9ef',
  },
  button: {
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'rgba(0,0,0,0.3)',
    borderTopWidth: 0.33,
    borderBottomWidth: 0.33,
  },
  text: {
    color: '#3467f8',
  },
});

const CustomButton = (props) => {
  return (
    <View style={props.style || styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        {props.title && props.icon
          ? <FontAwesome name={props.icon} size={18} color="#3467f8" />
          : <Text style={styles.text}>{props.title}</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const ButtonRow = (props) => {
  const show = {
    display: props.show ? 'flex' : 'none',
  }

  return(
    <View style={[styles.container, show]}>
      <View style={styles.buttonGroup}>
        <CustomButton onPress={props.onVote('upvote')} title="Up" icon="arrow-up" />
        <View style={styles.button} >
          <Text style={styles.text}>{props.votes}</Text>
        </View>
        <CustomButton onPress={props.onVote('downvote')} title="Down" icon="arrow-down" />
      </View>
      <CustomButton onPress={props.onComments} title="Comments" />
      <CustomButton onPress={() => console.log('share')} title="Share" />
    </View>
  );
}

export default ButtonRow;
