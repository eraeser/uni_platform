import {
  SET_INTERNALS,
  UPDATE_CONNECTIVITY,
  UPDATE_ACTIVITY,
} from '../actions/internals';

 import { Internals } from '../records/Internals';

const initialState = new Internals();

export default function internalReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONNECTIVITY:
      return state.set('connectivity', action.payload);
    case UPDATE_ACTIVITY:
      return state.set('activity', action.payload);
    case SET_INTERNALS: {
      let new_state = state.withMutations(state => {
        action.payload && Object.entries(action.payload).forEach(([key, value]) =>
          state.set(key, value))
        });
      return new_state;
    }
    default:
      return state;
  }
}
