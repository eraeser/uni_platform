import { ToastAndroid } from 'react-native';

import { HOST, PORT, API, AUTH_PREFIX } from './config';

async function updateChannelAsync(data, token) {
  try {
    const {
      name,
      description,
      channel_id,
    } = data;

    let body = {}
    if (name) {
      body.name = name;
    }
    if (description) {
      body.description = description;
    }

    let response = await fetch(
      `${HOST}:${PORT}/${API}/channels/${channel_id}/`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `${AUTH_PREFIX} ${token}`,
        },
        body: JSON.stringify(body),
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
    // console.error(error);
    return {};
  }
}

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
      return responseJson.results;
    }
    throw new Error('Network response was not ok.');
  } catch (error) {
    ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    // console.error(error);
    return [];
  }
}

async function getSubscribedChannelsAsync(token) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/users/me/subscribed/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'true',
          Authorization: `${AUTH_PREFIX} ${token}`,
        },
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
    // console.error(error);
    return [];
  }
}

async function getChannelAsync(channel_id) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/channels/${channel_id}/`, {
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
    throw new Error('Network response was not ok.');
  } catch (error) {
    ToastAndroid.show(error.toString(), ToastAndroid.LONG);
    // console.error(error);
    return {};
  }
}

export {
  getSubscribedChannelsAsync,
  getAllChannelsAsync,
  updateChannelAsync,
  getChannelAsync,
}
