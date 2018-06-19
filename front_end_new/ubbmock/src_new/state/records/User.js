import { Record } from 'immutable';

export const User = Record({
  id: null,
  auth_token: null,
  email: null,
  full_name: null,
  first_name: null,
  last_name: null,
  username: null,
  is_admin: null,
  date_joined: null,
});


export default User;
