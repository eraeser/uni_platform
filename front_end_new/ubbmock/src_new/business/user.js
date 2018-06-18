import { ToastAndroid } from 'react-native';

import { HOST, PORT, API } from './config';

async function logInUserAsync(user) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/api-token-auth/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      }
    );
    console.log(response);
    if(response.ok){
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    }
    throw new Error('Network response was not ok.');
  } catch (error) {
    ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    return '';
    // console.error(error);
  }
}

async function refreshTokenAsync(token) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/api-token-refresh/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      }
    );
    console.log(response);
    if(response.ok){
      let responseJson = await response.json();
      return responseJson;
    }
    throw new Error('Network response was not ok.');
  } catch (error) {
    ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    return '';
    // console.error(error);
  }
}

export {
  logInUserAsync,
  refreshTokenAsync,

}
