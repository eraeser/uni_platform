import { subscribeAppState, unsubscribeAppState } from './appState';
import { subscribeNetConnectivity, unsubscribeNetConnectivity } from './netConectivity';

export const subscribeServices = () => {
  subscribeAppState();
  subscribeNetConnectivity();
}

export const unsubscribeServices = () => {
  unsubscribeAppState();
  unsubscribeNetConnectivity();
}
