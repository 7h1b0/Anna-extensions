import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import TokenProvider from './context/token-context';

ReactDOM.render(
  <TokenProvider>
    <App />
  </TokenProvider>,
  document.getElementById('root'),
);
