import React from 'react';
import { useLogin } from '../api';

function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const login = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid form');
    }
  }

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        Username
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default Authentication;
