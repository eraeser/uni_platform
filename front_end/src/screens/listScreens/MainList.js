import React from 'react';
import { connect } from "react-redux";
import {
  View, TouchableOpacity, Text, StyleSheet, Button,
} from 'react-native';
import uuid from 'uuid/v4'
import { deleteItemThunk } from '../../state/actions/items';
import { Item } from '../../state/records/Item';
import LocalStorage from '../../state/localStorage/LocalStorage_lab5'

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    flex: 1,
  },
  content: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
});

class MainList extends React.Component {

  constructor(){
    super();
  }

  deleteItem = (item) => {
    this.props.dispatch(deleteItemThunk(item))
  }

  render(){
    return(
      <View>
        {this.props.items.map(item =>
          <View
            key={item.id}
            style={styles.content}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Item', {title: item.name, item: item})}
            >
              <Text> {`${item.name}`} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.deleteItem(item)}
            >
              <Text> X </Text>
            </TouchableOpacity>
          </View>)}
        <Button
          onPress={() => {
            const i = new Item({id: uuid(), name: ''})
            this.props.navigation.navigate('Item', {title: 'New Entry', item: i, create: true})
          }}
          title='New'
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const items = state.items.all;
  console.log(items);
  console.log(items.toJS());
  return({
    items: items,
  });
}

export default connect(mapStateToProps)(MainList);
