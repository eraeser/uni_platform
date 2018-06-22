import { AppState } from 'react-native';
import { store } from '../root/Root';
import { updateActivity } from '../state/actions/internals';

const _handleAppStateChange = (nextAppState) => {
  const last_activity = store.getState().internals.activity;
  if (last_activity && last_activity.match(/inactive|background/) && nextAppState === 'active') {
    console.log('App has come to the foreground!')
  }
  store.dispatch(updateActivity(nextAppState));
}

export const subscribeAppState = () => {
  AppState.addEventListener('change', _handleAppStateChange);
}

export const unsubscribeAppState = () => {
  AppState.removeEventListener('change', _handleAppStateChange);
}
