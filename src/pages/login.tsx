import React from 'react';
import { login } from '../api';
import { useDispatchUser } from '../context/user-context';

function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatchUser();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await login(username, password);
      dispatch({ username, token });
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
    <form onSubmit={handleSubmit} className="flex flex-col p-2">
      {error && <p>{error}</p>}
      <label>
        Username
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
          className="block focus:ring ring-green-500"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="block focus:ring ring-green-500"
        />
      </label>
      <button type="submit" className="text-green-700 mt-3">
        Save
      </button>
    </form>
  );
}

export default Authentication;
