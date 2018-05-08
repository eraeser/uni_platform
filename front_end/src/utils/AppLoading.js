import React from 'react';
import { View, ActivityIndicator } from 'react-native';

class AppLoading extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.startAsync().then(this.props.onFinish, this.props.onError)
  }

  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
}

export default AppLoading;
