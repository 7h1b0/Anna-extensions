import * as React from 'react';

import { useDispatchUser } from '../context/user-context';

function Footer() {
  const dispatch = useDispatchUser();

  function handleLogout() {
    dispatch({ username: null, token: null });
  }

  return (
    <footer>
      <button onClick={handleLogout}>Logout</button>
    </footer>
  );
}

export default Footer;
