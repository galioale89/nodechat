import React from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/AppViews/home';
import ChatPage from './views/AppViews/chat';
import MessageProvider from './context';

const socket: Socket = socketIOClient("http://localhost:3200", { transports: ["websocket"] });

const App: React.FC = () => {
  return (
    <MessageProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </MessageProvider>
  )
};

export default App;
