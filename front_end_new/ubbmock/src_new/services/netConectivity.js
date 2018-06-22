import { NetInfo } from 'react-native';
import { store } from '../root/Root';
import { updateConnectivity } from '../state/actions/internals';

const _handleConnectivityChange = isConnected => {
  console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
  store.dispatch(updateConnectivity(isConnected))
}

export const subscribeNetConnectivity = () => {
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    _handleConnectivityChange
  );
}

export const unsubscribeNetConnectivity = () => {
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    _handleConnectivityChange
  );
}
