import {
  SET_USER,
  UPDATE_TOKEN,
  RESET_USER,
} from '../actions/users';

 import { User } from '../records/User';

const initialState = new User();

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return state.set('auth_token', action.payload);
    case SET_USER: {
      let new_state = state.withMutations(state => {
        action.payload && Object.entries(action.payload).forEach(([key, value]) =>
          state.set(key, value))
        });
      if (action.payload && action.payload.first_name && action.payload.last_name) {
        new_state = new_state.set('full_name', `${new_state.first_name} ${new_state.last_name}`);
      }
      return new_state;
    }
    case RESET_USER:
      return state.clear();
    default:
      return state;
  }
}
