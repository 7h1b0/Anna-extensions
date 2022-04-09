import * as React from 'react';

import { useUser } from '../context/user-context';
import { useDispatchUser } from '../context/user-context';

function Footer() {
  const dispatch = useDispatchUser();
  const { username } = useUser();

  function handleLogout() {
    dispatch({ username: null, token: null });
  }

  return (
    <footer className="bg-grey-50 py-4 pl-4 pr-10">
      <h1 className="text-base">
        Hi <span className="text-green-700">{username}!</span>
      </h1>
      <button onClick={handleLogout} className="text-gray-800 text-xs">
        Logout
      </button>
    </footer>
  );
}

export default Footer;
