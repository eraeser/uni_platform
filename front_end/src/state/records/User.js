import { Record } from 'immutable';

const User = Record({
  id: null,
  authToken: null,
  name: null,
  isAdmin: null,
});

export default User;
