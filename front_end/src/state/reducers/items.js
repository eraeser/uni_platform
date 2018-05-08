import {
  DELETE_ITEM,
  CREATE_ITEM,
  SET_ITEMS,
  UPDATE_ITEM,
 } from '../actions/items';

 import { ItemsState } from '../records/Item';

const initialState = new ItemsState()

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ITEM:{
      const index = state.all.findIndex(listItem => {
        return listItem.get('id') === action.payload.id;
      });
      return state.setIn(['all', index], action.payload)
    }

    case SET_ITEMS:
      return state.set('all', action.payload);

    case CREATE_ITEM: {
      let all = state.all.push(action.payload);
      return state.set('all', all);
    }
    case DELETE_ITEM: {
      console.log('in reducer');
      const index = state.all.findIndex(listItem => {
        return listItem.get('id') === action.payload.id;
      });

      if (index === -1) {
        return state;
      }

      return state.set('all', state.all.delete(index));
    }

    default:
      return state;
  }
}
