export const UPDATE_CONNECTIVITY = 'UPDATE_CONNECTIVITY';
export const SET_INTERNALS = 'SET_INTERNALS';
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

export function updateConnectivity(connection) {
  return {
    type: UPDATE_CONNECTIVITY,
    payload: connection,
  };
}

export function updateActivity(active) {
  return {
    type: UPDATE_CONNECTIVITY,
    payload: active,
  };
}

export function setInternals(data) {
  return {
    type: SET_INTERNALS,
    payload: data,
  };
}
