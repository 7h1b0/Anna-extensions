import * as React from 'react';
import { Scene } from './scene';
import { useUser } from './context/user-context';
import { fetchHost } from './lib/storage';

export function useScenes() {
  const { token } = useUser();
  const [scenes, setScenes] = React.useState<Scene[]>([]);

  React.useEffect(() => {
    fetchHost()
      .then(({ host }) => {
        return fetch(`${host}/api/scenes/favorites`, {
          headers: {
            'x-access-token': token ?? '',
          },
        });
      })
      .then((res) => res.json())
      .then((scenes) => setScenes(scenes));
  }, []);

  return scenes;
}

export function useLaunchScene(sceneId: string) {
  const { token } = useUser();
  return () =>
    fetchHost().then(({ host }) =>
      fetch(`${host}/api/scenes/${sceneId}/action`, {
        headers: {
          'x-access-token': token ?? '',
        },
      }),
    );
}

export function login(
  host: string,
  username: string,
  password: string,
): Promise<string> {
  return fetch(`${host}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((payload) => {
      if (!payload.token) {
        throw new Error('Authentication failed');
      }
      return payload.token;
    });
}
