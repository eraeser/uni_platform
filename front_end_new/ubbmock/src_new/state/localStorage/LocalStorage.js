import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'User',
  FollowedThreads: 'FollowedThreads',
  SubscribedChannels: 'SubscribedChannels',
  Channels: 'Channels',
  Threads: 'Threads',
  Dashboard: 'Dashboard',
  Comments: 'Comments',
};

async function checkKeyConsistency() {
  const savedKeys = await getAllKeys();
  Object.keys(Keys).forEach(key => {
    !savedKeys.includes(key) ? setKey(key) : console.log(`${key} is OK`);
  })
}

async function getAllKeys() {
  const results = await AsyncStorage.getAllKeys()
  try {
    return results;
  } catch(e) {
    return [];
  }
}

async function setKey(key) {
  await AsyncStorage.setItem(key, JSON.stringify({}));
  console.log(`${key} was set`);
}

async function getUserAsync() {
  const results = await AsyncStorage.getItem(Keys.User);
  // console.log(results);

  try {
    return JSON.parse(results);
  } catch(e) {
    return {};
  }
}

function setUserAsync(user) {
  return AsyncStorage.mergeItem(Keys.User, JSON.stringify(user));
}

function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

function saveCommentsAsync(comments) {
  return AsyncStorage.mergeItem(Keys.Comments, JSON.stringify(comments));
}

async function getCommentsAsync() {
  let results = await AsyncStorage.getItem(Keys.Comments);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveChannelsAsync(channels) {
  return AsyncStorage.mergeItem(Keys.Channels, JSON.stringify(channels));
}

async function getChannelsAsync() {
  let results = await AsyncStorage.getItem(Keys.Channels);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveDashboardAsync(threads) {
  return AsyncStorage.mergeItem(Keys.Dashboard, JSON.stringify({threads}));
}

async function getDashboardAsync() {
  let results = await AsyncStorage.getItem(Keys.Dashboard);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveThreadsAsync(threads) {
  return AsyncStorage.mergeItem(Keys.Threads, JSON.stringify(threads));
}

async function getThreadsAsync() {
  let results = await AsyncStorage.getItem(Keys.Threads);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveSubscribedChannelsAsync(channels) {
  return AsyncStorage.mergeItem(Keys.SubscribedChannels, JSON.stringify(channels));
}

async function getSubscribedChannelsAsync() {
  let results = await AsyncStorage.getItem(Keys.SubscribedChannels);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveFollowedThreadsAsync(threads) {
  return AsyncStorage.mergeItem(Keys.FollowedThreads, JSON.stringify(threads));
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
  saveCommentsAsync,
  getCommentsAsync,
  setUserAsync,
  getUserAsync,
  removeUserAsync,
  saveDashboardAsync,
  getDashboardAsync,
  saveThreadsAsync,
  getThreadsAsync,
  saveChannelsAsync,
  getChannelsAsync,
  saveSubscribedChannelsAsync,
  getSubscribedChannelsAsync,
  saveFollowedThreadsAsync,
  getFollowedThreadsAsync,
  clearAllAsync,
  checkKeyConsistency,
};
