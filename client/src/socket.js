import { io } from 'socket.io-client';
import { updatePriceInState } from './redux/slices/priceSlice';

let socket;

export const initializeSocket = (store) => {
  socket = io('http://localhost:5000');

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });

  socket.on('newPrice', (data) => {
    store.dispatch(updatePriceInState(data));
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const emitPriceUpdate = (data) => {
  if (socket) socket.emit('priceUpdate', data);
};

export default {
  initializeSocket,
  disconnectSocket,
  emitPriceUpdate
};