import { ToastAndroid } from 'react-native';

import { HOST, PORT, API, AUTH_PREFIX } from './config';

async function updateCommentAsync(data, token) {
  try {
    const {
      content,
      comment_id,
      is_deleted,
    } = data;

    let response = await fetch(
      `${HOST}:${PORT}/${API}/comments/${comment_id}/`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `${AUTH_PREFIX} ${token}`,
        },
        body: JSON.stringify({
          content,
          is_deleted: is_deleted || false,
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
    return {};
  }
}

async function getThreadCommentsAsync(thread_id) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/threads/${thread_id}/comments/`, {
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
    return [];
  }
}

async function getCommentAsync(comment_id) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/comments/${comment_id}/`, {
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

async function deleteCommentAsync(comment_id, token) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/${API}/comments/${comment_id}/`, {
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
    return '';
  }
}

async function postCommentAsync(data, token) {
  try {

    const {
      content,
      parent_thread,
      parent_comment,
      author,
    } = data;

    console.log(data);
    console.log(token);

    let response = await fetch(
      `${HOST}:${PORT}/${API}/comments/`, {
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
          parent_thread,
          parent_comment,
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
    return {};
  }
}

export {
  postCommentAsync,
  updateCommentAsync,
  deleteCommentAsync,
  getCommentAsync,
  getThreadCommentsAsync,
}
