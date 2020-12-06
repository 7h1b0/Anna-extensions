import * as React from 'react';

import { fetchUser, saveUser } from '../lib/storage';

type User = {
  username: string | null;
  token: string | null;
};
const defaultUser = { username: null, token: null };
export const UserStateContext = React.createContext<User>(defaultUser);
export const UserDispatchContext = React.createContext<(user: User) => void>(
  () => void 0,
);

export const useUser = () => React.useContext(UserStateContext);
export const useDispatchUser = () => React.useContext(UserDispatchContext);

export default function UserProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const didMountRef = React.useRef(false);
  const [user, setUser] = React.useState<User>(defaultUser);

  React.useEffect(() => {
    if (didMountRef.current) {
      saveUser(user.token, user.username);
    } else {
      didMountRef.current = true;
      fetchUser().then((storage) => {
        setUser({ token: storage.token, username: storage.username });
      });
    }
  }, [user.token, user.username]);

  return (
    <UserStateContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}
