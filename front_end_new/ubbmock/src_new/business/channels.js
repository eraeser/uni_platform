import { ToastAndroid } from 'react-native';

import { HOST, PORT, API } from './config';

async function getAllChannelsAsync() {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/channels/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
        },
      }
    );
    console.log(response);
    if(response.ok){
      let responseJson = await response.json();
      return responseJson;
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserChannelsAsync(user_id, token) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/users/${user_id}/channels`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `JWT ${token}`,
        },
      }
    );
    console.log(response);
    if(response.ok){
      let responseJson = await response.json();
      return responseJson;
    }
  } catch (error) {
    console.error(error);
  }
}
