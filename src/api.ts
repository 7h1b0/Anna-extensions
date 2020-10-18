function fetchAPIOptions() {
  return browser.storage.local.get(['host', 'token']);
}

export function fetchScenes() {
  return fetchAPIOptions()
    .then(({ host, token }) => {
      return fetch(`${host}/scenes`, {
        headers: {
          'x-access-token': token,
        },
      });
    })
    .then((res) => res.json());
}

export function launchScene(sceneId) {
  return fetchAPIOptions().then(({ host, token }) =>
    fetch(`${host}/scenes/${sceneId}/action`, {
      headers: {
        'x-access-token': token,
      },
    }),
  );
}
