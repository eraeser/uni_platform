import { AsyncStorage } from 'react-native';

const Keys = {
  ExampleList: 'ExampleList',
};

function saveExampleListAsync(exampleListItems) {
  return AsyncStorage.setItem(Keys.ExampleList, JSON.stringify(exampleListItems));
}

async function getExampleListAsync() {
  let results = await AsyncStorage.getItem(Keys.ExampleList);

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
  saveExampleListAsync,
  getExampleListAsync,
  clearAllAsync,
};
