import React from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
  },
});

const CustomButton = (props) => {
  return (
    <View style={props.style || styles.buttonContainer}>
      <Button onPress={props.onPress} title={props.title} />
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
        <CustomButton onPress={() => console.log('upvote')} title="Up" />
        <CustomButton onPress={() => console.log('downvote')} title="Down" />
      </View>
      <CustomButton onPress={props.onComments} title="Comments" />
      <CustomButton onPress={() => console.log('share')} title="Share" />
    </View>
  );
}

export default ButtonRow;
