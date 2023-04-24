import React from 'react';
import AppView from './views/AppViews/index';
import MessagesProvider from './context/index';

const App: React.FC = () => {
  return (
    <MessagesProvider>
      <AppView />;
    </MessagesProvider>
  )
};

export default App;
