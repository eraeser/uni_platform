
import { ToastAndroid } from 'react-native';

const HOST = 'http://172.30.116.193';
const PORT = 4022

async function addBoatAsync(car) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/new`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: car.name,
          model: car.model,
          seats: car.seats,
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

async function updateBoatAsync(car) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/change`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: car.id,
          name: car.name,
          status: car.status,
          seats: car.seats,
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

async function addBoatRidesAsync(car) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/rides`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: car.id,
          rides: car.rides,
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

async function removeBoatAsync(car) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/boat/${car.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   id: car.id,
        // }),
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

async function buyCarAsync(car) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/buyCar`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: car.id,
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

async function returnCarAsync(car) {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/returnCar`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: car.id,
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

async function getAllBoatsAsync() {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/boats`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true',
        },
        // body: JSON.stringify({
        //   title: book.title,
        //   creation_date: book.date,
        // }),
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


async function getBusyBoatsAsync() {
  try {
    let response = await fetch(
      `${HOST}:${PORT}/busy`, {
        method: 'GET',
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        // },
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

export default {
  addBoatAsync,
  addBoatRidesAsync,
  removeBoatAsync,
  updateBoatAsync,
  getAllBoatsAsync,
  getBusyBoatsAsync,
};
