import { createContext, useState } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../helpers/ProviderUrl';

export const SocketContext = createContext(); //Contexto de sockets

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(io(SOCKET_URL)); //Abrir conexión de sockets con el servidor

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
