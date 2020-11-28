export function fetchToken() {
  return browser.storage.local.get(['token']);
}

export function saveToken(token: string) {
  browser.storage.local.set({
    token: token,
  });
}
