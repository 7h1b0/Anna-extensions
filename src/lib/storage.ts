export function fetchUser() {
  return browser.storage.local.get(['token', 'username']);
}

export function saveUser(token: string | null, username: string | null) {
  browser.storage.local.set({
    token,
    username,
  });
}
