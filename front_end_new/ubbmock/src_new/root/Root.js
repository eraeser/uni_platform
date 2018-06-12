import React from 'react';
import { Provider } from "react-redux";
import configureStore from "../state/store/configureStore";
import App from '../app/App';

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
