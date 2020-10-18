import React from 'react';

function Options() {
  const [token, setToken] = React.useState('');
  const [host, setHost] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    browser.storage.local.set({
      token,
      host,
    });
  }

  function handleToken(e) {
    setToken(e.target.value);
  }

  function handleHost(e) {
    setHost(e.target.value);
  }

  React.useEffect(() => {
    browser.storage.local.get(['token', 'host']).then((result) => {
      setToken(result.token);
      setHost(result.host);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Host
        <input type="text" name="host" value={host} onChange={handleHost} />
      </label>
      <label>
        token
        <input type="text" name="token" value={token} onChange={handleToken} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default Options;
