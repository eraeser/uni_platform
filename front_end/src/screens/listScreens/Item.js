import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableWithoutFeedback, DatePickerAndroid } from 'react-native';

import { VictoryBar } from "victory-native";

import { updateItemThunk, createItemThunk } from '../../state/actions/items';

export class Item extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.navigation.state.params.title,
      item: this.props.navigation.state.params.item,
      create: this.props.navigation.state.params.create,
    }
    console.log(this.props.navigation.state);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.handleSave });
  }

  handleSave = () => {
    if(this.state.create)
      this.props.dispatch(createItemThunk(this.state.item))
    else {
      this.props.dispatch(updateItemThunk(this.state.item))
    }
  }

  handleNameChange = (name) => {
    const item = this.state.item.set('name', name);
    this.setState({
      item: item,
    })
  }

  handleDateChange = (date) => {
    const item = this.state.item.set('date', date);
    this.setState({
      item: item,
    })
  }

  WUT = async (stateKey, options) => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.handleDateChange(`${day}/${month+1}/${year}`)
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <View>
        <Text>{this.state.title}</Text>
        <TextInput
          value={this.state.item.name}
          onChangeText={this.handleNameChange}
        />
        <Text>Date</Text>
        <Text>{this.state.item.date}</Text>
        <VictoryBar />
        <TouchableWithoutFeedback
          onPress={this.WUT}
        >
          <View>
            <Text>Date selector</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default connect()(Item);
