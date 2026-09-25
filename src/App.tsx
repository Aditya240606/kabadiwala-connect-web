import React from 'react';
import { AppProvider } from './context/AppContext';
import { AppRouter } from './routes/AppRouter';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
