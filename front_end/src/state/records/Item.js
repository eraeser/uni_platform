import { Record, List } from 'immutable';

export const ItemsState = Record({
  all: new List(),
});

export const Item = Record({
  id: '',
  name: '',
  date: '',
});
