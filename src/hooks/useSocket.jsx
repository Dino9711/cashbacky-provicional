import { useContext, useEffect } from 'react';
import { SocketContext } from '../providers/SocketProvider';

export const useSocketOn = (event, callback) => {
  const { socket } = useContext(SocketContext); //Se consume el contexto del socket

  const on = (event, callback) => {
    if (socket) socket.on(event, callback);
  };

  const off = (event, callback) => {
    if (socket) socket.off(event, callback);
  };
  //Recibe mensaje del socket
  useEffect(() => {
    on(event, callback);

    return () => {
      off(event, callback);
    };
  }, []);

  return on;
};

export const useSocketEmit = (eventName = '', data = '') => {
  const { socket } = useContext(SocketContext);

  const emit = (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  useEffect(() => {
    emit(eventName, data);
  }, [data]);

  return emit;
};

export const useSocketOff = (event, callback) => {
  const { socket } = useContext(SocketContext);

  const off = (event, callback) => {
    if (socket) socket.off(event, callback);
  };

  useEffect(() => {
    off(event, callback);
  }, []);

  return off;
};
