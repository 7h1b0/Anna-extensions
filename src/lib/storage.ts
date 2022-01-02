export function fetchUser() {
  return browser.storage.local.get(['token', 'username']);
}

export function saveUser(token: string | null, username: string | null) {
  browser.storage.local.set({
    token,
    username,
  });
}

export function fetchHost() {
  return browser.storage.local.get(['host']);
}

export function saveHost(host: string) {
  browser.storage.local.set({ host });
}
