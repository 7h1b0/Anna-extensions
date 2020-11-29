import { Scene } from './scene';
import { useToken, useDispatchToken } from './context/token-context';

const HOST = 'http://anna.lan';

export function useFetchScenes(): () => Promise<Scene[]> {
  const token = useToken();
  return () =>
    fetch(`${HOST}/api/scenes/favorites`, {
      headers: {
        'x-access-token': token,
      },
    }).then((res) => res.json());
}

export function useLaunchScene(sceneId: string) {
  const token = useToken();
  return () =>
    fetch(`${HOST}/api/scenes/${sceneId}/action`, {
      headers: {
        'x-access-token': token,
      },
    });
}

export function useLogin() {
  const setToken = useDispatchToken();
  return (username: string, password: string) =>
    fetch(`${HOST}/api/login`, {
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
        setToken(payload.token);
      });
}
