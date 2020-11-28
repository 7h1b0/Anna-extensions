import * as React from 'react';

import { fetchToken, saveToken } from '../lib/storage';

export const TokenStateContext = React.createContext<string | null>(null);
export const TokenDispatchContext = React.createContext<
  (token: string) => void
>(null);

export const useToken = () => React.useContext(TokenStateContext);
export const useDispatchToken = () => React.useContext(TokenDispatchContext);

export default function TokenProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    fetchToken().then((storage) => {
      setToken(storage.token);
    });
  }, []);

  React.useEffect(() => {
    saveToken(token);
  }, [token]);

  return (
    <TokenStateContext.Provider value={token}>
      <TokenDispatchContext.Provider value={setToken}>
        {children}
      </TokenDispatchContext.Provider>
    </TokenStateContext.Provider>
  );
}
