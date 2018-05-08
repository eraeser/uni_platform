import openSocket from 'socket.io-client';
import { ToastAndroid } from 'react-native';

const socket = openSocket('ws://0.0.0.0:8080', { transports: ['websocket'] });

socket.on('connect', () => console.log("Client: conected"));
socket.on('disconnect', function(){});
socket.on('message', (data) => {
  ToastAndroid.showWithGravity(data.data, ToastAndroid.LONG, ToastAndroid.TOP);
  console.log(data)
})
socket.emit('message', {data: 'lolololol'})

// ws.onopen = () => {
//   // connection opened
//   ws.send('something'); // send a message
// };
//
// ws.onmessage = (e) => {
//   // a message was received
//   console.log(e.data);
// };
//
// ws.onerror = (e) => {
//   // an error occurred
//   console.log(e.message)
// };
//
// ws.onclose = (e) => {
//   // connection closed
//   console.log(e);
//   console.log(e.code, e.reason);
// };
