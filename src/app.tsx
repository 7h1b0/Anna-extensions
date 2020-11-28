import React from 'react';

import Login from './components/login';
import SceneList from './components/scene-list';

import { useToken } from './context/token-context';

function App() {
  const token = useToken();

  if (token) {
    return <SceneList />;
  }

  return <Login />;
}

export default App;
