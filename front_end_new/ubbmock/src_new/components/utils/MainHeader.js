import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f7f7f7',
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 0.33,
    height: 49,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class MainHeader extends React.Component {

  height = {
    height: this.props.height || 49,
  }

  render() {
    return(
      <View style={[styles.header, this.height]}>
        {this.props.children}
      </View>
    );
  }
}

export default MainHeader;
