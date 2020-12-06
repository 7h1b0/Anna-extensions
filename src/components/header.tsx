import * as React from 'react';

import { useUser } from '../context/user-context';

function Header() {
  const { username } = useUser();

  return <header>Hi {username}!</header>;
}

export default Header;
