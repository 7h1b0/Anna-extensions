import React from 'react';

import Login from './pages/login';
import Dashboard from './pages/dashboard';

import { useUser } from './context/user-context';

function App() {
  const user = useUser();

  if (user.token && user.username) {
    return <Dashboard />;
  }

  return <Login />;
}

export default App;
