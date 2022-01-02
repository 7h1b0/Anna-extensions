import React from 'react';
import { saveHost } from '../lib/storage';
import { login } from '../api';
import { useDispatchUser } from '../context/user-context';

function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [host, setHost] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatchUser();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await login(host, username, password);
      dispatch({ username, token });
      saveHost(host);
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

  function handleHost(e) {
    setHost(e.target.value);
  }

  return (
    <div className="p-2">
      <h1 className="text-lg text-grey-900 font-semibold">Sign up to Anna</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 mt-3">
        {error && <p>{error}</p>}
        <label className="text-sm font-medium text-grey-900 ">
          Url
          <input
            type="text"
            name="host"
            value={host}
            onChange={handleHost}
            className="mt-1 block w-full rounded focus:outline outline-2 outline-teal-500 p-2"
          />
        </label>
        <label className="text-sm font-medium text-grey-900 ">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            className="mt-1 block w-full rounded focus:outline outline-2 outline-teal-500 p-2"
          />
        </label>
        <label className="text-sm font-medium text-grey-900 ">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="mt-1 block w-full rounded focus:outline outline-2 outline-teal-500 p-2"
          />
        </label>
        <button
          type="submit"
          className="inline-block rounded text-white bg-teal-700 hover:bg-teal-600 mt-3 py-2"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Authentication;
