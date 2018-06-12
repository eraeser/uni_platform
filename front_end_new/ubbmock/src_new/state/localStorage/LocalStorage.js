import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'User',
  FollowedThreads: 'FollowedThreads',
};

async function getUserAsync() {
  const results = await AsyncStorage.getItem(Keys.User);
  console.log(results);

  try {
    return JSON.parse(results);
  } catch(e) {
    return {};
  }
}

function setUserAsync(user) {
  return AsyncStorage.setItem(Keys.User, JSON.stringify(user));
}

function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

function saveFollowedThreadsAsync(threads) {
  return AsyncStorage.setItem(Keys.FollowedThreads, JSON.stringify(threads));
}

async function getFollowedThreadsAsync() {
  let results = await AsyncStorage.getItem(Keys.FollowedThreads);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function clearAllAsync() {
  return AsyncStorage.clear();
}

export default {
  setUserAsync,
  getUserAsync,
  removeUserAsync,
  saveFollowedThreadsAsync,
  getFollowedThreadsAsync,
  clearAllAsync,
};
