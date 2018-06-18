import { ToastAndroid } from 'react-native';

import { HOST, PORT, API, AUTH_PREFIX } from './config';

async function deleteThreadAsync(thread_id, token) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/threads/${thread_id}/`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `${AUTH_PREFIX} ${token}`,
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
  }
}

async function updateThreadAsync(data, token) {
  try {

    const {
      content,
      name,
      description,
      thread_id,
    } = data;

    let body = {}
    if (content) {
      body.content = content;
    }
    if (name) {
      body.name = name;
    }
    if (description) {
      body.description = description;
    }

    let response = await fetch(
      `${HOST}:${PORT}/${API}/threads/${thread_id}/`, {
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
  }
}

async function postThreadAsync(data, token) {
  try {

    const {
      content,
      name,
      description,
      parent_channel,
      author,
    } = data;

    let response = await fetch(
      `${HOST}:${PORT}/${API}/threads/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `${AUTH_PREFIX} ${token}`,
        },
        body: JSON.stringify({
          content,
          name,
          description,
          parent_channel,
          author,
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
    // console.error(error);
  }
}

async function getChannelThreadsAsync(channel_id) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/channels/${channel_id}/threads/`, {
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

async function getThreadAsync(thread_id) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/threads/${thread_id}/`, {
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
  }
}

export {
  getChannelThreadsAsync,
  postThreadAsync,
  updateThreadAsync,
  deleteThreadAsync,
  getThreadAsync,
}
