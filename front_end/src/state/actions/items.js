import LocalStorage from '../localStorage/LocalStorage_lab5';

export const UPDATE_ITEM = 'UPDATE_ITEM';
export const SET_ITEMS = 'SET_ITEMS';
export const CREATE_ITEM = 'CREATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export function updateItem(item) {
  return {
    type: UPDATE_ITEM,
    payload: item,
  };
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    payload: items,
  };
}

export function createItem(item) {
  return {
    type: CREATE_ITEM,
    payload: item,
  };
}

export function createItemThunk(item) {
  return (dispatch, getState) => {
    dispatch(createItem(item))
    return LocalStorage.saveExampleListAsync(getState().items.all)
  }
}

export function updateItemThunk(item) {
  return (dispatch, getState) => {
    dispatch(updateItem(item))
    return LocalStorage.saveExampleListAsync(getState().items.all)
  }
}

export function deleteItemThunk(item) {
  return (dispatch, getState) => {
    dispatch(deleteItem(item))
    return LocalStorage.saveExampleListAsync(getState().items.all)
  }
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    payload: item,
  };
}
